class WsockHandler(MixinHandler, tornado.websocket.WebSocketHandler):

	# boris here
	# Каждый раз новый экземпляр создаётся при каждом новом сеансе связи
	#  т.е. при перелогинивании пересоздаётся этот экземпляр
	#  Это то, что надо, только надо деструктор тут определить, где останавливать наш Sound (ну, или лучше прописать деструктор самого Sound)

	def initialize(self, loop, sound):
		super(WsockHandler, self).initialize(loop)
		self.worker_ref = None
		print('01010.WsockHandler: ', sound)
		self.sound = sound
		#if sound['use_c']:
		#	self.sound = Sound({
		#		'use_c': True,
		#		'capturePipe': sound['capturePipe']
		#	}) # boris here: pass mode: CAPTURE
		#	self.sound.start('localhost', 'boris'); # boris stub: 'localhost' and 'boris' are stubs
		print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2')

	def open(self):
		self.src_addr = self.get_client_addr()
		logging.info('Connected from {}:{}'.format(*self.src_addr))

		#if not self.src_addr[0] in allowed_ips:
		#	 self.close(reason='Websocket authentication failed.')
		workers = clients.get(self.src_addr[0])
		if not workers:
			self.close(reason='Websocket authentication failed.')
			return

		try:
			worker_id = self.get_value('id')
		except (tornado.web.MissingArgumentError, InvalidValueError) as exc:
			self.close(reason=str(exc))
		else:
			worker = workers.get(worker_id)
			if worker:
				workers[worker_id] = None
				self.set_nodelay(True)
				worker.set_handler(self)
				self.worker_ref = weakref.ref(worker)
				self.loop.add_handler(worker.fd, worker, IOLoop.READ)
			else:
				self.close(reason='Websocket authentication failed.')

	def on_message(self, message):
		# boris here 2
		#print('boris debug 00919.02', message)
		logging.debug('{!r} from {}:{}'.format(message, *self.src_addr))
		worker = self.worker_ref()
		try:
			msg = json.loads(message)
		except JSONDecodeError:
			return

		if not isinstance(msg, dict):
			return

		if 'data' in msg:
			# for i in msg['data']: # boris debug
			#	 print(ord(i))
			pass


		resize = msg.get('resize')
		if resize and len(resize) == 2:
			try:
				worker.chan.resize_pty(*resize)
			except (TypeError, struct.error, paramiko.SSHException):
				pass

		data = msg.get('data')
		if data and isinstance(data, UnicodeType):
			worker.data_to_dst.append(data)
			worker.on_write()
		#if self.sound:
		#	sound = msg.get('sound')
		#	if sound: # type object
		#		sound = json.dumps(sound) # type string
		#		sound = str.encode(sound) # type bytes
		#		self.sound.write_captured_data(sound, worker.sound_identifier())
		#		#print(self.sound.data_to_write().decode('ascii'))
		#		#worker.data_to_dst.append(self.sound.data_to_write().decode('ascii'))
		#		#worker.on_write()
		#
		#		#worker.inject_command(self.sound.data_to_write())
		#
		#		#worker.ssh.exec_command();
			

	def on_close(self):
		logging.info('Disconnected from {}:{}'.format(*self.src_addr))
		if not self.close_reason:
			self.close_reason = 'client disconnected'

		worker = self.worker_ref() if self.worker_ref else None
		if worker:
			worker.close(reason=self.close_reason)

		#if self.sound:
		#	self.sound.stop()
