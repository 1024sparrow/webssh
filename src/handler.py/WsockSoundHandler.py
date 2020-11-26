class WsockSoundHandler(MixinHandler, tornado.websocket.WebSocketHandler):
	def initialize(self, loop, sound):
		super(WsockSoundHandler, self).initialize(loop)
		self.worker_ref = None
		self.sound = sound
	def open(self):
		self.src_addr = self.get_client_addr()
		logging.info('Connected from {}:{}'.format(*self.src_addr))

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
		worker = self.worker_ref()
		self.sound.write_captured_data(message, worker.sound_identifier())
		worker.write_sound_playback_data(self.sound.data_to_write())
	def on_close(self):
		if self.sound:
			self.sound.stop()
