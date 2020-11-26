class NotFoundHandler(MixinHandler, tornado.web.ErrorHandler):

	def initialize(self):
		super(NotFoundHandler, self).initialize()

	def prepare(self):
		raise tornado.web.HTTPError(404)
