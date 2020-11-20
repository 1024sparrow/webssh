//function WebsshTerminal(p_element, p_url_opts_data.bgcolor){
function WebsshTerminal(p_element, p_bgcolor, p_socket){
	Terminal.call(
		this,
		{
			cursorBlink: true,
			theme: {
				background: p_bgcolor || 'black'
			}
		}
	);
	this.open(p_element);
	this._width;
	this._height;
	this._socket = p_socket;
	this.custom_font = document.fonts ? document.fonts.values().next().value : undefined;
	window.boris = this;//


	this.update_font_family();
	this.default_fonts;

	if (document.fonts) {
		(function(p_this){
			document.fonts.ready.then(
				function(){
					if (p_this.custom_font_is_loaded() === false) {
						document.body.style.fontFamily = p_this.custom_font.family;
					}
				}
			);
		})(this);
	}
	//this._fitAddon = new FitAddon.FitAddon();
	//this.loadAddon(this._fitAddon);

	this.focus();
	this.blur();

	this.onData((function(p2_socket){return function(p_data){
		p2_socket.send(JSON.stringify({data: p_data}));
	};})(p_socket));

	/*window.addEventListener('message', function(p){
		console.log('XEXEXEXEXEX:', p);
	}, false);*/
};

WebsshTerminal.prototype = Object.create(Terminal.prototype);
WebsshTerminal.prototype.constructor = WebsshTerminal;

WebsshTerminal.prototype.custom_font_is_loaded = function() {
	if (!this.custom_font) {
		console.log('No custom font specified.');
	} else {
		console.log('Status of custom font ' + this.custom_font.family + ': ' + this.custom_font.status);
		if (this.custom_font.status === 'loaded') {
			return true;
		}
		if (this.custom_font.status === 'unloaded') {
			return false;
		}
	}
}

WebsshTerminal.prototype.current_geometry = function(){
	var tmp, text, arr;
	if (!this._width || !this._height) {
		try {
			tmp = this._core._renderService._renderer.dimensions;
			this._width = tmp.actualCellWidth;
			this._height = tmp.actualCellHeight;
			console.log(`001120 1: ${this._width}`);
		}
		catch (TypeError) {
			text = $('.xterm-helpers style').text();
			arr = text.split('xterm-normal-char{width:');
			this._width = parseFloat(arr[1]);
			arr = text.split('div{height:');
			this._height = parseFloat(arr[1]);
			console.log(`001120 2: ${this._width}`);
		}
	}

	// boris here: can not take real font size

	var cols = parseInt(window.innerWidth / this._width, 10) - 1;
	var rows = parseInt(window.innerHeight / this._height, 10);
	console.log(`this._width: ${this._width}; this._height: ${this._height}`);
	console.log("COLS: ", cols, ", ROWS: ", rows);
	return {'cols': cols, 'rows': rows};
};

WebsshTerminal.prototype.resize_terminal = function(){
	//this.resize(20,20);
	//$('#terminal .terminal').toggleClass('fullscreen');
	//this._fitAddon.fit();
	var geometry = this.current_geometry();
	this.on_resize(geometry.cols, geometry.rows);
};

WebsshTerminal.prototype.on_resize = function(p_cols, p_rows){
	if (p_cols !== this.cols || p_rows !== this.rows) {
		console.log('Resizing terminal to geometry: format_geometry(' + p_cols + ', ' + p_rows + ')');
		this.resize(p_cols, p_rows);
		this._socket.send(JSON.stringify({'resize': [p_cols, p_rows]}));
	}
};

WebsshTerminal.prototype.set_background_color = function(p_color){
	this.setOption('theme', {
		background: p_color
	});
};

WebsshTerminal.prototype.update_font_family = function() {
	if (this.font_family_updated) {
		console.log('Already using custom font family');
		return;
	}

	if (!this.default_fonts) {
		this.default_fonts = this.getOption('fontFamily');
	}

	if (this.custom_font_is_loaded()) {
		var new_fonts =  this.custom_font.family + ', ' + this.default_fonts;
		this.setOption('fontFamily', new_fonts);
		this.font_family_updated = true;
		console.log('Using custom font family ' + new_fonts);
	}
};

WebsshTerminal.prototype.reset_font_family = function() {
	if (!this.font_family_updated) {
		console.log('Already using default font family');
		return;
	}

	if (this.default_fonts) {
		this.setOption('fontFamily', this.default_fonts);
		this.font_family_updated = false;
		console.log('Using default font family ' + this.default_fonts);
	}
};
