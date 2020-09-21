import threading
import pipes
import time


class Sound:
	# boris here
	def __init__(self, p_sound):
		#open()
		# ('boris debug 009181: ', {'use_sound': True, 'capturePipe': 'boris/capture.pipe', 'use_c': True, 'playbackPipe': 'boris/playback.pipe', 'use_p': True})
		# self._pipe_p = pipe_p
		# self._pipe_c = pipe_c
		self._tP = Thread(target=self.run_p)
		self._tC = Thread(target=self.run_c)
		self._running = false

	def run_stub(self):
		return

	def run_p(self):
		return

	def run_c(self):
		return

	def start(self, p_hostname, p_username):
		if p_hostname != 'localhost':
			print('can not start sound for any host but "localhost": not implemented')
			return
		self._running = true
		self._tP.start()
		self._tC.start()

	def stop(self):
		self._running = false
		self._tP.join()
		self._tC.join()

	# read data from a pipe and get the data to write to web-client
	def data_to_write(self):
		return ''

	# extract audio data from web-client's side and write that to pipe
	def extract_audio_response(self, message):
		return message
