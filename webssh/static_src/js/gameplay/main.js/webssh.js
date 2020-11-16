function Webssh(){
	this.status = $('#status')
	this.button = $('.btn-primary');
	this.form_container = $('.form-container');
	this.waiter = $('#waiter');
	this.term_type = $('#term');
		//style = {},
	this.default_title = 'WebSSH';
	this.title_element = document.querySelector('title');
	this.form_id = 'connect';
	this.debug = document.getElementById(this.form_id).noValidate;
	this.DISCONNECTED = 0;
	this.CONNECTING = 1;
	this.CONNECTED = 2;
	this.state = this.DISCONNECTED;
	this.messages = {1: 'This client is connecting ...', 2: 'This client is already connnected.'};
	this.key_max_size = 16384;
	this.fields = ['hostname', 'port', 'username'];
	this.form_keys = this.fields.concat(['password', 'totp']);
	this.opts_keys = ['bgcolor', 'title', 'encoding', 'command', 'term'];
	this.url_form_data = {};
	this.url_opts_data = {};
	this.validated_form_data;
	this.event_origin;
	this.hostname_tester = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/;
	this._decoder = window.TextDecoder ? new window.TextDecoder('utf-8') : 'utf-8';


	// shared variables
	this.custom_font = document.fonts ? document.fonts.values().next().value : undefined;
	this.default_fonts;

	this._terminal;
	this._socketSsh;
	this._socketSound;

	Utils.parse_url_data(
		Utils.decode_uri(window.location.search.substring(1)) +
			'&' +
			Utils.decode_uri(window.location.hash.substring(1)),
		this.form_keys,
		this.opts_keys,
		this.url_form_data,
		this.url_opts_data
	);


	var eBody = document.getElementsByTagName('body')[0];
	eBody.style.overflow = "hidden";
	eBody.style.margin = '0';

	(function(self){
		var f = function(){
			var w = window.innerWidth;
			var h = window.innerHeight;
			self._onResized(w,h);
		};
		if(window.attachEvent) {
			window.attachEvent('onresize', f);
			window.attachEvent('onload', f);
		}
		else if(window.addEventListener) {
			window.addEventListener('resize', f, true);
			window.addEventListener('load', f, true);
		}
		else{
			console.log('epic fail.')
		}
	})(this);

	(function(self){
		var f = function(event){
			event.preventDefault();
			self._onFormSubmit();
		};
		var e = document.getElementById('form');
		e.addEventListener('submit', f, true);
	})(this);
};

Webssh.prototype.log_status = function(p_text, p_to_populate) {
	var
		names = this.form_keys.concat(['passphrase']),
		i,
		name
	;
	console.log(p_text);
	this.status.html(p_text.split('\n').join('<br/>'));

	if (p_to_populate && this.validated_form_data) {

		//populate_form(validated_form_data);
		for (i=0; i < names.length; i++) {
			name = names[i];
			$('#'+name).val(this.validated_form_data.get(name));
		}

		validated_form_data = undefined;
	}

	if (waiter.css('display') !== 'none') {
		waiter.hide();
	}

	if (form_container.css('display') === 'none') {
		form_container.show();
	}
};

Webssh.prototype._onResized = function(p_w, p_h){
	console.log(`resized to ${p_w}x${p_h}`);

	/*this._terminal = new WebsshTerminal(
		document.getElementById('terminal'),
		this.url_opts_data.bgcolor || 'black'
	);*/

	document.getElementById('terminal').style.width = '' + p_w + 'px';
	document.getElementById('terminal').style.height = '' + p_h + 'px';
	if (this._terminal){
		this._terminal.resize_terminal();
	}
};

Webssh.prototype._onFormSubmit = function(){
	console.log('form submit');
	this.connect();
};

Webssh.prototype.connect = function(
	p_hostname,
	p_port,
	p_username,
	p_password,
	p_privatekey,
	p_passphrase,
	p_totp
){
	// for console use
	var result, opts;

	if (this.state !== this.DISCONNECTED) {
		console.log(this.messages[this.state]);
		return;
	}

	if (p_hostname === undefined) {
		result = this.connect_without_options();
	}
	else {
		if (typeof p_hostname === 'string') {
			opts = {
				hostname: p_hostname,
				port: p_port,
				username: p_username,
				password: p_password,
				privatekey: p_privatekey,
				passphrase: p_passphrase,
				totp: p_totp
			};
		}
		else {
			opts = p_hostname;
		}

		result = this.connect_with_options(opts);
	}

	if (result) {
		this.state = this.CONNECTING;
		this.default_title = result.title;
		if (p_hostname) {
			this.validated_form_data = result.data;
		}
		Utils.store_items(this.fields, result.data);
	}
};

Webssh.prototype.validate_form_data = function(p_data) {
	var
		i,
		attr,
		val,
		attrs = this.form_keys.concat(['privatekey', 'passphrase']),
		hostname = p_data.get('hostname'),
		port = p_data.get('port'),
		username = p_data.get('username'),
		pk = p_data.get('privatekey'),
		result = {
			valid: false,
			data: p_data,
			title: ''
		},
		errors = [],
		size
	;

	//clean_data
	for (i = 0; i < attrs.length; i++) {
		attr = attrs[i];
		val = p_data.get(attr);
		if (typeof val === 'string') {
			p_data.set(attr, val.trim());
		}
	}

	if (!hostname) {
		errors.push('Value of hostname is required.');
	}
	else {
		if (!this.hostname_tester.test(hostname)) {
			errors.push('Invalid hostname: ' + hostname);
		}
	}
	if (!port) {
		port = 22;
	}
	else {
		if (!(port > 0 && port < 65535)) {
			errors.push('Invalid port: ' + port);
		}
	}
	if (!username) {
		errors.push('Value of username is required.');
	}
	if (pk) {
		size = pk.size || pk.length;
		if (size > key_max_size) {
			errors.push('Invalid private key: ' + pk.name || '');
		}
	}
	if (!errors.length || debug) {
		result.valid = true;
		result.title = username + '@' + hostname + ':' + port;
	}
	result.errors = errors;

	return result;
};

Webssh.prototype.connect_without_options = function() {
	// use data from the form
	var
		form = document.getElementById(this.form_id),
		inputs = form.querySelectorAll('input[type="file"]'),
		url = form.action,
		data,
		pk,
		i,
		input
	;

	//disable_file_inputs
	for (i = 0; i < inputs.length; i++) {
		input = inputs[i];
		if (input.files.length === 0) {
			input.setAttribute('disabled', '');
		}
	}

	data = new FormData(form);
	pk = data.get('privatekey');

	//enable_file_inputs
	for (i = 0; i < inputs.length; i++) {
		inputs[i].removeAttribute('disabled');
	}

	var fAjaxPost = (function(self){return function() {
		self.status.text('');
		self.button.prop('disabled', true);

		ajax({
			sourcePath: url,
			readyFunc: (function(self2){return function(p_data){
				self2.ajax_complete_callback(p_data)
			};})(self),
			errorFunc: (function(self2){return function(p_isNetworkProblem){
				self2.ajax_error_callback(p_isNetworkProblem)
			};})(self),
			//timeout: 3000,
			dataToPost: data
			// addonHttpHeaders: ...
		});
	};})(this);

	var result = this.validate_form_data(data);
	if (!result.valid) {
		this.log_status(result.errors.join('\n'));
		return;
	}

	if (pk && pk.size && !debug) {
		Utils.read_file_as_text(pk, function(p_text) {
			if (p_text === undefined) {
				this.log_status('Invalid private key: ' + pk.name);
			} else {
				fAjaxPost();
			}
		});
	}
	else {
		fAjaxPost();
	}

	return result;
};

Webssh.prototype.connect_with_options = function(data) {
	/*
	// use data from the arguments
	var form = document.querySelector(form_id),
			url = data.url || form.action,
			_xsrf = form.querySelector('input[name="_xsrf"]');

	var result = validate_form_data(wrap_object(data));
	if (!result.valid) {
		log_status(result.errors.join('\n'));
		return;
	}

	data.term = term_type.val();
	data._xsrf = _xsrf.value;
	if (event_origin) {
		data._origin = event_origin;
	}

	status.text('');
	button.prop('disabled', true);

	$.ajax({
			url: url,
			type: 'post',
			data: data,
			complete: ajax_complete_callback
	});

	return result;
	*/

	return 'not implemented yet';
};

Webssh.prototype.ajax_complete_callback = function(p_data){
	console.log('ajax ok');

	// boris here 01115: не создават экземпляр WebsshTerminal, пока не открыты все необходимые сокеты (1, если без звука; 2, если со звуком)

	var data;
	data = undefined;
	try {
		data = JSON.parse(p_data);
	}
	catch (e){
	}

	if (!data || !data.id){
		Utils.log_status('failed', true);
		this.state = this.DISCONNECTED;
		this.button.prop('disabled', false);
		this.ajax_error_callback(false);
		return;
	}
	var
		ws_url = window.location.href.split(/\?|#/, 1)[0].replace('http', 'ws'),
		join = (ws_url[ws_url.length-1] === '/' ? '' : '/'),
		sockSound,
		i,
		tmp,
		sound = {},
		sockConnection
	;
	this._socketSsh = new window.WebSocket(ws_url + join + 'ws?id=' + data.id);
	if (tmp = document.getElementById('use-sound-playback')){
		if (tmp.checked){
			sound.playback = true;
		}
	}
	if (tmp = document.getElementById('use-sound-capturing')){
		if (tmp.checked){
			sound.capture = true;
		}
	}
	if (sound.playback || sound.capture){
		this._socketSound = new window.WebSocket(ws_url + join + 's?id=' + data.id);
	}

	if (!data.encoding) {
		console.log('Unable to detect the default encoding of your server');
		data.encoding = encoding;
	}
	else {
		console.log('The deault encoding of your server is ' + data.encoding);
	}

	sockConnection = {
		connectedCount: 0,
		sockets: [this._socketSsh]
	};
	if (this._socketSound)
		sockConnection.sockets.push(this._socketSound);

	(function(p_sockConnection, p_this){
		function fOk(){
			if (++(p_sockConnection.connectedCount) === p_sockConnection.sockets.length){
				p_this._onSocketsConnected(p_sockConnection.sockets);
			}
		};
		function fError(p_error){
			console.error(p_error);
		};
		function fClose(){
			for (i = 0 ; i < sockConnection.sockets.length ; ++i){
				tmp = sockConnection.sockets[i];
				if (tmp !== this){
					tmp.close();
				}
				p_this._onSocketsDisconnected();
			}
		};
		for (i = 0 ; i < sockConnection.sockets.length ; ++i){
			tmp = sockConnection.sockets[i];
			tmp.addEventListener('open', fOk);
			tmp.addEventListener('error', fError);
			tmp.addEventListener('close', fClose);
		}
	})(sockConnection, this);
};

Webssh.prototype.ajax_error_callback = function(p_isNetworkProblem){
	console.log('ajax failed');
	Utils.log_status('failed', true);
	this.state = this.DISCONNECTED;
	this.button.prop('disabled', false);
};

Webssh.prototype._onSocketsConnected = function(p_sockets){
	console.log('_onSocketsConnected');
	var i, socket;

	this._terminal = new WebsshTerminal(
		document.getElementById('terminal'),
		this.url_opts_data.bgcolor || 'black',
		this._socketSsh
	);

	document.getElementById('terminal-cont').style.display = 'block';
	this._terminal.resize_terminal();

	for (i = 0 ; i < p_sockets.length ; ++i){
		socket = p_sockets[i];
		socket.addEventListener(
			'message',
			(function(p_this, p_socket){
				return function(p_message){
					p_this._onSocketMessage(p_socket, p_message);
				};
			})(this, socket)
		);
	}

	/*{{
	this._terminal.write('Hello, Boris!\r\n');
	var term
	term = this._terminal;
	this._terminal.onData(function(data){
		//console.log(`"${data}"`, typeof data);
		//console.log("88888", data.charCodeAt(0));
		if (data.charCodeAt(0) === 13)
			term.write('\r\n');
		else
			term.write(data);
	});
	//}}*/
};

Webssh.prototype._onSocketsDisconnected = function(){
	console.log('_onSocketsDisconnected');
	this._terminal = undefined;
	this._socketSsh = undefined;
	this._socketSound = undefined;
	document.getElementById('terminal-cont').style.display = 'none';
};

function borisStringToBytearray(p_str){
	var retVal = '', i;
	for (i = 0 ; i < p_str.length ; ++i){
		if (retVal)
			retVal += ', ';
		retVal += p_str.charCodeAt(i);
	}
	retVal = retVal ? '[' + retVal + ']' : '<empty>';
	return retVal;
}

Webssh.prototype._onSocketMessage = function(p_socket, p_message){
	if (p_socket === this._socketSsh){
		Utils.read_file_as_text(
			p_message.data,
			(function(p2_self){return function(p2_data){
				// boris e: ecsape-sequence с js-кодом вьюхи (графический режим, определяемый самим приложением)
				//console.log(
				//	'88', borisStringToBytearray(p2_data)
				//);
				p2_self._terminal.write(p2_data);
			};})(this),
			this._decoder
		);
	}
	else if (p_socket === this._socketSound){
		console.log('sound data taken');
	}
};
