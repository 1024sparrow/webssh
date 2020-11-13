function Wssh(p_decoder){
	this._decoder = p_decoder;
}
Wssh.prototype.set_encoding = function(p_new_encoding){
	// for console use
	if (!p_new_encoding) {
		console.log('An encoding is required');
		return;
	}

	if (!window.TextDecoder) {
		this._decoder = p_new_encoding;
		encoding = this._decoder;
		console.log('Set encoding to ' + encoding);
	}
	else {
		try {
			this._decoder = new window.TextDecoder(p_new_encoding);
			encoding = this._decoder.encoding;
			console.log('Set encoding to ' + encoding);
		}
		catch (RangeError) {
			console.log('Unknown encoding ' + p_new_encoding);
			return false;
		}
	}
}

