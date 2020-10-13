import os
import logging
import tornado.web
import tornado.ioloop

from tornado.options import options
from webssh import handler
from webssh.sound import Sound
from webssh.handler import IndexHandler, WsockHandler, SoundHandler, NotFoundHandler
from webssh.settings import (
	get_app_settings, get_host_keys_settings, get_policy_setting,
	get_ssl_context, get_server_settings, check_encoding_setting
)

def get_sound_settings():
	soundPipeP = os.environ['SOUND_PIPE_P']
	soundPipeC = os.environ['SOUND_PIPE_C']
	settings = dict(
		use_sound = True if len(soundPipeP) or len(soundPipeC) else False,
		use_p = True if len(soundPipeP) else False,
		use_c = True if len(soundPipeC) else False,
		playbackPipe = soundPipeP,
		capturePipe = soundPipeC
	)
	#if settings['use_sound']:
	#	return None
	return settings


def make_handlers(loop, options):
	host_keys_settings = get_host_keys_settings(options)
	policy = get_policy_setting(options, host_keys_settings)
	sound_settings = get_sound_settings()
	sound = None
	if sound_settings['use_sound']:
		sound = Sound(sound_settings)
		sound.start('localhost', 'boris')

	handlers = [
		(r'/', IndexHandler, dict(loop=loop, policy=policy,
			host_keys_settings=host_keys_settings, sound=sound_settings)),
		(r'/ws', WsockHandler, dict(loop=loop, sound=sound)),
		(r'/sound', SoundHandler, dict(loop=loop, sound=sound))
	]
	return handlers


def make_app(handlers, settings):
	settings.update(default_handler_class=NotFoundHandler)
	return tornado.web.Application(handlers, **settings)


def app_listen(app, port, address, server_settings):
	app.listen(port, address, **server_settings)
	if not server_settings.get('ssl_options'):
		server_type = 'http'
	else:
		server_type = 'https'
		handler.redirecting = True if options.redirect else False
	logging.info(
		'Listening on {}:{} ({})'.format(address, port, server_type)
	)


def main():
	options.parse_command_line()
	check_encoding_setting(options.encoding)
	loop = tornado.ioloop.IOLoop.current()
	app = make_app(make_handlers(loop, options), get_app_settings(options))
	ssl_ctx = get_ssl_context(options)
	server_settings = get_server_settings(options)
	app_listen(app, options.port, options.address, server_settings)
	if ssl_ctx:
		server_settings.update(ssl_options=ssl_ctx)
		app_listen(app, options.sslport, options.ssladdress, server_settings)
	loop.start()


if __name__ == '__main__':
	main()
