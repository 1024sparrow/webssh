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
	this._width;
	this._height;
	this._socket = p_socket;
};

WebsshTerminal.prototype = Object.create(Terminal.prototype);
WebsshTerminal.constructor = WebsshTerminal;

WebsshTerminal.prototype.current_geometry = function(){
	var tmp, text, arr;
	if (!this._width || !this._height) {
		try {
			tmp = term._core._renderService._renderer.dimensions;
			this._width = tmp.actualCellWidth;
			this._height = tmp.actualCellHeight;
		}
		catch (TypeError) {
			text = $('.xterm-helpers style').text();
			arr = text.split('xterm-normal-char{width:');
			this._width = parseFloat(arr[1]);
			arr = text.split('div{height:');
			this._height = parseFloat(arr[1]);
		}
	}

	// boris here: can not take real font size

	var cols = parseInt(window.innerWidth / this._width, 10) - 1;
	var rows = parseInt(window.innerHeight / this._height, 10);
	console.log("COLS: ", cols, ", ROWS: ", rows);
	return {'cols': cols, 'rows': rows};
};

WebsshTerminal.prototype.resize_terminal = function(){
	var geometry = this.current_geometry();
	this.on_resize(geometry.cols, geometry.rows);
};

WebsshTerminal.prototype.on_resize = function(p_cols, p_rows){
	if (p_cols !== this.cols || p_rows !== this.rows) {
		console.log('Resizing terminal to geometry: ' + format_geometry(p_cols, p_rows));
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

	if (!default_fonts) {
		default_fonts = this.getOption('fontFamily');
	}

	if (custom_font_is_loaded()) {
		var new_fonts =  custom_font.family + ', ' + default_fonts;
		term.setOption('fontFamily', new_fonts);
		this.font_family_updated = true;
		console.log('Using custom font family ' + new_fonts);
	}
};

WebsshTerminal.prototype.reset_font_family = function() {
	if (!this.font_family_updated) {
		console.log('Already using default font family');
		return;
	}

	if (default_fonts) {
		this.setOption('fontFamily', default_fonts);
		this.font_family_updated = false;
		console.log('Using default font family ' + default_fonts);
	}
};
