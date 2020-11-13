var Utils =
{
	stringToIntArray: function(p_string){
		var retVal = [];
		for (let i = 0 ; i < p_string.length ; ++i){
			retVal.push(p_string.charCodeAt(i));
		}
		return retVal;
	},

	store_items: function(names, data) {
		var i, name, value;
		for (i = 0; i < names.length; i++) {
			name = names[i];
			value = data.get(name);
			if (value){
				window.localStorage.setItem(name, value);
			}
		}
	},

	restore_items: function(names) {
		var i, name, value;
		for (i=0; i < names.length; i++) {
			name = names[i];
			value = window.localStorage.getItem(name);
			if (value) {
				$('#'+name).val(value);
			}
		}
	},

	populate_form: function(data) {
		var names = form_keys.concat(['passphrase']),
				i, name;
		for (i=0; i < names.length; i++) {
			name = names[i];
			$('#'+name).val(data.get(name));
		}
	},

	get_object_length: function(object) {
		return Object.keys(object).length;
	},

	decode_uri: function(uri) {
		try {
			return decodeURI(uri);
		} catch(e) {
			console.error(e);
		}
		return '';
	},

	decode_password: function(encoded) {
		try {
			return window.atob(encoded);
		} catch (e) {
			 console.error(e);
		}
		return null;
	},

	parse_url_data: function(string, form_keys, opts_keys, form_map, opts_map) {
		var i, pair, key, val,
				arr = string.split('&');
		for (i = 0; i < arr.length; i++) {
			pair = arr[i].split('=');
			key = pair[0].trim().toLowerCase();
			val = pair.slice(1).join('=').trim();
			if (form_keys.indexOf(key) >= 0) {
				form_map[key] = val;
			} else if (opts_keys.indexOf(key) >=0) {
				opts_map[key] = val;
			}
		}
		if (form_map.password) {
			form_map.password = decode_password(form_map.password);
		}
	},

	read_file_as_text: function(file, callback, decoder) {
		var reader, encoding;
		if (!window.TextDecoder) {
			encoding = decoder;
			reader = new window.FileReader();
			if (encoding === undefined) {
				encoding = 'utf-8';
			}
			reader.onload = function() {
				if (callback) {
					callback(reader.result);
				}
			};
			reader.onerror = function (e) {
				console.error(e);
			};
			reader.readAsText(file, encoding);
		}
		else {
			var reader = new window.FileReader();
			if (decoder === undefined) {
				decoder = new window.TextDecoder('utf-8', {'fatal': true});
			}
			reader.onload = function() {
				var text;
				try {
					text = decoder.decode(reader.result);
				} catch (TypeError) {
					console.log('Decoding error happened.');
				} finally {
					if (callback) {
						callback(text);
					}
				}
			};
			reader.onerror = function (e) {
				console.error(e);
			};
			reader.readAsArrayBuffer(file);
		}
	}
};
