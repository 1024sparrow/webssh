class SoundHandler(MixinHandler, tornado.web.RequestHandler):
	def initialize(self, loop, sound):
		super(SoundHandler, self).initialize(loop)
		print('boris 01013 p')
		self.sound = sound
	def head(self):
		pass
	def get(self):
		# boris here 01010
		#self.set_header('Content-type', 'sound/wav')
		#self.sdt_header('Content-length')
		src_data = self.sound.data_to_write()
		self.write('hello boris. sound data: %s' % len(src_data)) # boris here: here must be sound (playback)
		print('123212321232123212321')
		print(src_data)
		print('boris debug 01011')
		self.finish()
