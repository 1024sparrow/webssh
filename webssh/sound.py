import threading
import pipes

class Sound:
	def __init__(self, pipe_p, pipe_c):
		self._pipe_p = pipe_p
		self._pipe_c = pipe_c
