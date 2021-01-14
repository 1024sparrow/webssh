class IndexHandler(MixinHandler, tornado.web.RequestHandler):

	executor = ThreadPoolExecutor(max_workers=cpu_count()*5)

	def initialize(self, loop, policy, host_keys_settings, sound):
		super(IndexHandler, self).initialize(loop)
		self.policy = policy
		self.host_keys_settings = host_keys_settings
		self.sound_settings = sound
		#self.sound = None
		#if sound['use_p']:
		#	self.sound = Sound({
		#		'use_p': True,
		#		'playbackPipe': sound['playbackPipe']
		#	})
		self.ssh_client = self.get_ssh_client()
		self.debug = self.settings.get('debug', False)
		self.font = self.settings.get('font', '')
		self.result = dict(id=None, status=None, encoding=None)
		print('boris debug 00919.01', sound) # boris debug

	def write_error(self, status_code, **kwargs):
		if swallow_http_errors and self.request.method == 'POST':
			exc_info = kwargs.get('exc_info')
			if exc_info:
				reason = getattr(exc_info[1], 'log_message', None)
				if reason:
					self._reason = reason
			self.result.update(status=self._reason)
			self.set_status(200)
			self.finish(self.result)
		else:
			super(IndexHandler, self).write_error(status_code, **kwargs)

	def get_ssh_client(self):
		ssh = SSHClient()
		ssh._system_host_keys = self.host_keys_settings['system_host_keys']
		ssh._host_keys = self.host_keys_settings['host_keys']
		ssh._host_keys_filename = self.host_keys_settings['host_keys_filename']
		ssh.set_missing_host_key_policy(self.policy)
		return ssh

	def get_privatekey(self):
		name = 'privatekey'
		lst = self.request.files.get(name)
		if lst:
			# multipart form
			filename = lst[0]['filename']
			data = lst[0]['body']
			value = self.decode_argument(data, name=name).strip()
		else:
			# urlencoded form
			value = self.get_argument(name, u'')
			filename = ''

		return value, filename

	def get_hostname(self):
		value = self.get_value('hostname')
		if not (is_valid_hostname(value) or is_valid_ip_address(value)):
			raise InvalidValueError('Invalid hostname: {}'.format(value))
		return value

	def get_port(self):
		value = self.get_argument('port', u'')
		if not value:
			return DEFAULT_PORT

		port = to_int(value)
		if port is None or not is_valid_port(port):
			raise InvalidValueError('Invalid port: {}'.format(value))
		return port

	def lookup_hostname(self, hostname, port):
		key = hostname if port == 22 else '[{}]:{}'.format(hostname, port)

		if self.ssh_client._system_host_keys.lookup(key) is None:
			if self.ssh_client._host_keys.lookup(key) is None:
				raise tornado.web.HTTPError(
						403, 'Connection to {}:{} is not allowed.'.format(
							hostname, port)
					)

	def get_args(self):
		hostname = self.get_hostname()
		port = self.get_port()
		username = self.get_value('username')
		password = self.get_argument('password', u'')
		privatekey, filename = self.get_privatekey()
		passphrase = self.get_argument('passphrase', u'')
		totp = self.get_argument('totp', u'')

		if isinstance(self.policy, paramiko.RejectPolicy):
			self.lookup_hostname(hostname, port)

		if privatekey:
			pkey = PrivateKey(privatekey, passphrase, filename).get_pkey_obj()
		else:
			pkey = None

		self.ssh_client.totp = totp
		args = (hostname, port, username, password, pkey)
		logging.debug(args)

		return args

	def parse_encoding(self, data):
		try:
			encoding = to_str(data.strip(), 'ascii')
		except UnicodeDecodeError:
			return

		if is_valid_encoding(encoding):
			return encoding

	def get_default_encoding(self, ssh):
		commands = [
			'$SHELL -ilc "locale charmap"',
			'$SHELL -ic "locale charmap"'
		]

		for command in commands:
			try:
				_, stdout, _ = ssh.exec_command(command, get_pty=True)
			except paramiko.SSHException as exc:
				logging.info(str(exc))
			else:
				data = stdout.read()
				logging.debug('{!r} => {!r}'.format(command, data))
				result = self.parse_encoding(data)
				if result:
					return result

		logging.warning('Could not detect the default encoding.')
		return 'utf-8'

	def ssh_connect(self, args):
		allowed = True#
		#allowed = False
		#if args[0] in allowed_users:
		#	 if args[1] in allowed_users[args[0]]:
		#		 if args[2] in allowed_users[args[0]][args[1]]:
		#			 allowed = True
		if not allowed:
			raise ValueError('Authentication failed.')
		ssh = self.ssh_client
		dst_addr = args[:2]
		logging.info('Connecting to {}:{}'.format(*dst_addr))

		try:
			ssh.connect(*args, timeout=options.timeout)
		except socket.error:
			raise ValueError('Unable to connect to {}:{}'.format(*dst_addr))
		except paramiko.BadAuthenticationType:
			raise ValueError('Bad authentication type.')
		except paramiko.AuthenticationException:
			raise ValueError('Authentication failed.')
		except paramiko.BadHostKeyException:
			raise ValueError('Bad host key.')

		term = self.get_argument('term', u'') or u'xterm'
		chan = ssh.invoke_shell(term=term)
		chan.setblocking(0)
		print('boris 01013 ssh_connect: args: ', args)
		worker = Worker(self.loop, ssh, chan, dst_addr, args[2])
		worker.encoding = options.encoding if options.encoding else \
			self.get_default_encoding(ssh)
		return worker

	def check_origin(self):
		event_origin = self.get_argument('_origin', u'')
		header_origin = self.request.headers.get('Origin')
		origin = event_origin or header_origin

		if origin:
			if not super(IndexHandler, self).check_origin(origin):
				raise tornado.web.HTTPError(
					403, 'Cross origin operation is not allowed.'
				)

			if not event_origin and self.origin_policy != 'same':
				self.set_header('Access-Control-Allow-Origin', origin)

	def head(self):
		pass

	def get(self):
		self.render(
			'index.html',
			debug=self.debug,
			font=self.font,
			sound=True, #self.sound_settings['use_sound'],
			soundPlayback=True, #self.sound_settings['use_p'],
			soundCapturing=True #self.sound_settings['use_c']
		)

	@tornado.gen.coroutine
	def post(self):
		if self.debug and self.get_argument('error', u''):
			# for testing purpose only
			raise ValueError('Uncaught exception')

		ip, port = self.get_client_addr()
		workers = clients.get(ip, {})
		if workers and len(workers) >= options.maxconn:
			raise tornado.web.HTTPError(403, 'Too many live connections.')

		self.check_origin()

		try:
			args = self.get_args()
		except InvalidValueError as exc:
			raise tornado.web.HTTPError(400, str(exc))

		future = self.executor.submit(self.ssh_connect, args)

		try:
			worker = yield future
		except (ValueError, paramiko.SSHException) as exc:
			logging.error(traceback.format_exc())
			self.result.update(status=str(exc))
		else:
			if not workers:
				clients[ip] = workers
			worker.src_addr = (ip, port)
			workers[worker.id] = worker
			self.loop.call_later(options.delay or DELAY, recycle_worker,
								 worker)
			self.result.update(id=worker.id, encoding=worker.encoding)

		self.write(self.result)
