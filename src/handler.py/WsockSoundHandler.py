class WsockSoundHandler(MixinHandler, tornado.websocket.WebSocketHandler):
	def initialize(self, loop, sound):
		super(WsockSoundHandler, self).initialize(loop)
		self.worker_ref = None
		with open(os.environ['SOUND_CONFIG_PATH'], 'r') as f:
			data = f.read()
			self.conf = json.loads(data)
		self.sound = Sound(loop, {
			#'use_c': True,
			'use_c': False,
			'use_p': True,
			'playbackPipe': self.conf['parameters']['fifoPlayback'],
			'capturePipe': self.conf['parameters']['fifoCapture'],
			'websocket': self
		})
		print('10109.1232', self.conf['parameters']['fifoPlayback']);

	def open(self):
		print('01128.1: open') # boris debug
		self.src_addr = self.get_client_addr()
		print('01128.3: ', self.src_addr)
		logging.info('Connected from {}:{}'.format(*self.src_addr))

		#worker_id = self.get_value('id')
		#print('01128.4: id:', worker_id)

		hostname = self.get_value('hostname')
		port = self.get_value('port')
		username = self.get_value('username')

		# boris here (01128):
		# лорп
		print('01128.4: hostname:', hostname)
		print('01128.4: port:', port)
		print('01128.4: username:', username)

		self.sound.start(hostname, username)


		#workers = clients.get(self.src_addr[0])
		#if not workers:
		#	self.close(reason='Websocket authentication failed.')
		#	return
		#try:
		#	worker_id = self.get_value('id')
		#except (tornado.web.MissingArgumentError, InvalidValueError) as exc:
		#	self.close(reason=str(exc))
		#else:
		#	worker = workers.get(worker_id)
		#	if worker:
		#		workers[worker_id] = None
		#		self.set_nodelay(True)
		#		worker.set_handler(self)
		#		self.worker_ref = weakref.ref(worker)
		#		self.loop.add_handler(worker.fd, worker, IOLoop.READ)
		#	else:
		#		self.close(reason='Websocket authentication failed.')

	def on_message(self, message):
		print('on_message: ', message) # boris here: это записанное в браузере аудио. Осталось только записать его в FIFO.
		self.sound.onPSocketRead(message);
		pass

		#worker = self.worker_ref()
		#self.sound.write_captured_data(message, worker.sound_identifier())
		#worker.write_sound_playback_data(self.sound.data_to_write())

	def on_close(self):
		print('01128.1: close') # boris debug
		#if self.sound:
		#	self.sound.stop()
