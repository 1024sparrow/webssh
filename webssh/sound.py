import threading
import pipes


class Sound:
	# boris here
	def __init__(self, p_sound):
		#open()
		# ('boris debug 009181: ', {'use_sound': True, 'capturePipe': 'boris/capture.pipe', 'use_c': True, 'playbackPipe': 'boris/playback.pipe', 'use_p': True})
		# self._pipe_p = pipe_p
		# self._pipe_c = pipe_c

		self._running = False
		self._pC = None
		self._pP = None
		self._mutexRunning = None
		# boris e: не 'use_c' и 'capturePipe', а только 'capturePipe'(Всё равно мы проверяем (и вынуждены проверять!) на сам факт наличия такого поля, пусть наличие поля означает, что опция активна)
		if 'use_c' in p_sound:
			print('******************** c')
			self._pC = p_sound['capturePipe']
			self._tC = threading.Thread(target=self.run_c)
			self._mutexC = threading.Lock()
			self._bufferC = bytes()
		if 'use_p' in p_sound:
			print('******************** p')
			self._pP = p_sound['playbackPipe']
			self._tP = threading.Thread(target=self.run_p)
			self._mutexP = threading.Lock()
			self._bufferP = bytes()
		if self._pC or self._pP:
			self._mutexRunning = threading.Lock() # boris here 01008: incorrect thread stoping

	def __del__(self):
		print('sound destructor')
		with self._mutexRunning:
			self._running = False

	def run_stub(self):
		return

	def run_p(self):
		#f = open(self._pP, 'rb')
		#while self._running:
		#	chunk = f.read()
		#	with self._mutexP:
		#		self._bufferP += chunk
		#f.close()
		# write request, read response

		while True:
			with self._mutexP:
				with open(self._pP, 'rb') as f:
					try:
						self._bufferP += f.read() # boris here 01010
					except IOError as e:
						pass
			with self._mutexRunning:
				if not self._running:
					break

		print('PLAYBACK THREAD NORMALLY CLOSED')
		return

	def run_c(self):
		# boris here: loop this and use conditional variable linked with API method
		print('boris debug 01008')
		while True:
			with self._mutexC:
				if self._bufferC:
					with open(self._pC, 'wb') as f:
						try:
							f.write(self._bufferC)
							self._bufferC = bytes()
						except IOError as e:
							pass
			with self._mutexRunning:
				if not self._running:
					break
		print('CAPTURE THREAD NORMALLY CLOSED')
		return

	def start(self, p_hostname, p_username):
		if p_hostname != 'localhost':
			print('can not start sound for any host but "localhost": not implemented')
			return
		if self._mutexRunning is None:
			self._running = True
		else:
			with self._mutexRunning:
				self._running = True
		if self._pP:
			self._tP.start()
		if self._pC:
			self._tC.start()

	def stop(self):
		print('sound stopping...')
		if self._mutexRunning is None:
			self._running = False
		else:
			with self._mutexRunning:
				self._running = False
		if self._pP:
			self._tP.join()
		if self._pC:
			self._tC.join()
		print('sound stopped')

	'''
	# read data from a pipe and get the data to write to web-client
	def data_to_write(self):
		retVal = bytes()
		with self._mutexP:
			retVal = self._bufferP
			self._bufferP = bytes()
		print('############', self._bufferP)
		return b'\x1b[0z' + retVal + b'\x1b[1z'
	'''

	# write captured data to the Pipe
	def write_captured_data(self, p_data):
		#print('UYTRUYTRUYTRUYTRUYTRUYTRUYTR:', p_data)
		with self._mutexC:
			self._bufferC += p_data

	'''
	# extract audio data from web-client's side and write that to pipe
	def extract_audio_response(self, message):
		retVal = bytes()
		dataToWrite = bytes()
		buffer = bytes()
		state = 0
		prevState = 0
		for i in message:
			if state == 0 and i == 27:
				state = 1
			elif state == 1 and i == 91:
				state = 2
			elif state == 2 and i == 48:
				state = 3
			elif state == 2 and i == 49:
				state = 13
			elif i == 122:
				if state == 3:
					state = prevState = 4
				elif state == 13:
					state = prevState = 0
				else:
					state = prevState
			else:
				state = prevState
			buffer += i.encode('utf-8')
			if state == 0:
				retVal += buffer
				buffer = bytes()
			elif state == 4:
				dataToWrite += buffer
				buffer = bytes()
		if dataToWrite:
			with self._mutexC:
				self._bufferC += dataToWrite
		print('%%%%%%%%%%%%%%%', dataToWrite)
		return retVal.decode('utf-8')
	'''
