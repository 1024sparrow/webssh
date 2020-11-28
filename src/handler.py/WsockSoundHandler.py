class WsockSoundHandler(MixinHandler, tornado.websocket.WebSocketHandler):
	def initialize(self, loop, sound):
		super(WsockSoundHandler, self).initialize(loop)
		self.worker_ref = None
		#self.sound = sound

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
		print('01128.4: hostname:', hostname)
		print('01128.4: port:', port)
		print('01128.4: username:', username)


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
		print('on_message: ', message)
		#worker = self.worker_ref()
		#self.sound.write_captured_data(message, worker.sound_identifier())
		#worker.write_sound_playback_data(self.sound.data_to_write())

	def on_close(self):
		print('01128.1: close') # boris debug
		#if self.sound:
		#	self.sound.stop()
