import threading
import pipes

#def 

class Sound:
	# boris here
	def __init__(self, p_sound):
		#open()
		# ('boris debug 009181: ', {'use_sound': True, 'capturePipe': 'boris/capture.pipe', 'use_c': True, 'playbackPipe': 'boris/playback.pipe', 'use_p': True})
		# self._pipe_p = pipe_p
		# self._pipe_c = pipe_c
		pass

	# read data from a pipe and get the data to write to web-client
	def data_to_write(self):
		return ''

	# extract audio data from web-client's side and write that to pipe
	def extract_audio_response(self, message):
		return message
