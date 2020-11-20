//var wssh = new Wssh();
var wssh = {};

//(function(){
	{%% ajax.js %%}
	{%% utils.js %%}

	(function() {
	// For FormData without getter and setter
		var
			proto = FormData.prototype,
			data = {}
		;

		if ('ontouchstart' in window){
			document.getElementById('use-screen-keyboard').checked = true;
			document.getElementById('screen-keyboard-checkbox-area').style.display = 'block';
		}
		else{
			document.getElementById('use-screen-keyboard').checked = false;
		}

		if (!proto.get) {
			proto.get = function (name) {
				if (data[name] === undefined) {
					var input = document.querySelector('input[name="' + name + '"]'),
							value;
					if (input) {
						if (input.type === 'file') {
							value = input.files[0];
						} else {
							value = input.value;
						}
						data[name] = value;
					}
				}
				return data[name];
			};
		}

		if (!proto.set) {
			proto.set = function (name, value) {
				data[name] = value;
			};
		}
	})();


	{%% term.js %%}

	{%% webssh.js %%}

	var websshPrivate = new Webssh();


	function custom_font_is_loaded() {
		if (!custom_font) {
			console.log('No custom font specified.');
		} else {
			console.log('Status of custom font ' + custom_font.family + ': ' + custom_font.status);
			if (custom_font.status === 'loaded') {
				return true;
			}
			if (custom_font.status === 'unloaded') {
				return false;
			}
		}
	}

//})();
