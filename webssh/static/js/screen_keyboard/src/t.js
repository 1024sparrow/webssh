'use strict';

/*
Class ScreenKeyboard.
set Visible by method setVisible(boolean p_on). Invisible by default.
*/

function ScreenKeyboard(p_terminal, p_socket, p_hostname, p_username){
	/* States:
	  0 - normal
	  1 - pressed. If Release
	  2 - released (we )
	*/
	this._state = 0;
	this._hostname = p_hostname;
	this._username = p_username;

	this._terminalMode = 0; // 0 - bracketed paste mode OFF, 1 - bracketed paste mode ON
	this._terminal = p_terminal;
	this._socket = p_socket;
	this._layout = {
		{%% baseLayout.js %%}
	};
	this._currentTty = 'q';
	this._currentModifier = 'normal';
	//this._currentLanguage = undefined;
	this._modifiers = {
		'shift_left': 'shift',
		'shift_right': 'shift',
		'ctrl_left': 'ctrl',
		'ctrl_right': 'ctrl',
		'alt_left': 'alt',
		'alt_right': 'alt',
		'win_left': 'win',
		'win_right': 'win'
	};
	this._opacity = 0.3;
	var tmp = document.createElement('div');
	this._eContainer = tmp;
	tmp = tmp.style;
	//this._eContainer.style.display = 'none';
	//tmp.border = '2px solid red';//
	tmp.display = 'none';
	//tmp.position = 'absolute';
	tmp.position = 'fixed';
	tmp.left = 0;
	tmp.top = 0;
	tmp.width = '100%';
	tmp.height = '100%';
	tmp.zIndex = '256';
	document.body.appendChild(this._eContainer);

	this._buttons = [];

	var bn;
	var xCell, yRow = 0, yCell, wCell, hRow, hCell;
	for (const oRow of this._layout.rows){
		xCell = 0;
		hRow = oRow.height;
		for (const oButton of oRow.buttons){
			wCell = oButton.width;

			if (!oButton.subitems.length)
			{
				console.error("incorrect empty set of buttons in columns");
				return;
			}
			hCell = hRow / oButton.subitems.length;
			yCell = yRow;
			for (const oSubitem of oButton.subitems){
				// create button here
				bn = document.createElement('img');
				bn.src = `static/img/screenkeyboard/${oSubitem.text}.png`;
				bn.alt = oSubitem.text;
				bn.style.opacity = this._opacity;
				//bn.style.background = `url("static/img/screenkeyboard/${oSubitem.text}.png")`; // boris here
				//bn.innerHTML = oSubitem.text;
				bn.className = 'keyboard__key';
				bn.keyId = oSubitem.text;

				this._eContainer.appendChild(bn);
				/*bn.addEventListener('click', (function(p_self){return function(p_event){
					ScreenKeyboard.prototype._generateKeyEvent.call(p_self, p_event);
				};})(this), false);*/

				this._buttons.push({
					e: bn,
					geometry: { // geometry in internal units
						x: xCell,
						y: yCell,
						w: wCell,
						h: hCell
					},
					x1: 0,
					x2: 0,
					y1: 0,
					y2: 0,
					image: oSubitem.text,
					shift_image: oSubitem.shift_text,
					keyCode: oSubitem.keycode,
					modifier: this._modifiers[oSubitem.text]
				});

				yCell += hCell;
			}
			xCell += wCell;
		}
		yRow += hRow;
	}
	// add mouse catching layer
	tmp = document.createElement('div');
	tmp.style.position = 'fixed';
	tmp.style.top = 0;
	tmp.style.left = 0;
	tmp.style.width = '100%';
	tmp.style.height = '100%';
	tmp.style.zIndex = '257';

	{%% events.js %%}

	this._eContainer.appendChild(tmp);

	(function(self){
		var f = function(){
			var
				w = window.innerWidth,
				h = window.innerHeight
			;
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
		var tmp = self._username + {%% screenMark %%} + self._currentTty;
		setTimeout(function(){
			self._socket.send(
				JSON.stringify(
					{
						data: 'screen -r ' + tmp + ' || screen -S ' + tmp + '\r'
					}
				)
			);
		}, 3000);
	})(this);
};
ScreenKeyboard.prototype.setVisible = function(p_on){
	var
		w = window.innerWidth,
		h = window.innerHeight
	;
	if (this._isVisible !== p_on){
		this._eContainer.style.display = p_on ? 'block' : 'none';
		if (this._isVisible = p_on){
			this._onResized(w, h);
		}
	}
};
ScreenKeyboard.prototype.setOpacity = function(p_opacity){
	var bn;
	for (bn of this._buttons){
		bn.e.style.opacity = p_opacity;
	}
	this._opacity = p_opacity;
};
ScreenKeyboard.prototype.opacity = function(){
	return this._opacity;
};
ScreenKeyboard.prototype.setLayout = function(p_layout){
	console.log('set keyboard layout: ', p_layout);
};
ScreenKeyboard.prototype.processTerminalData = function(p_data){
	var i, ch, state = 0;
	/*var debugString = '';
	for (i = 0 ; i < p_data.length ; ++i){
		//this._terminal.write(`(${ch})`);
		debugString += `(${p_data[i]}: ${p_data.charCodeAt(i)})`;

	}
	this._socket.send(debugString);*/
	for (i = 0 ; i < p_data.length ; ++i){
		ch = p_data.charCodeAt(i);
		// https://en.wikipedia.org/wiki/ANSI_escape_code
		// CSI ? 2004 h, [ 27, 91, 63, 50, 48, 48, 52, 104 ] - in
		// CSI ? 2004 l, [ 27, 91, 63, 50, 48, 48, 52, 108 ] - out
		if (state === 0 && ch === 27)
			state = 1;
		else if (state === 1 && ch === 91)
			state = 2;
		else if (state === 2 && ch === 63)
			state = 3;
		else if (state === 3 && ch === 50)
			state = 4;
		else if (state === 4 && ch === 48)
			state = 5;
		else if (state === 4 && ch === 53)
			state = 15;
		else if (state === 5 && ch === 48)
			state = 6;
		else if (state === 6 && ch === 52)
			state = 7;
		else if (state === 7 || state === 15){
			if (ch === 104){
				this._terminalMode = 1;
			}
			else if (ch === 108){
				this._terminalMode = 0;
			}
			state = 0;
		}
		else{
			state = 0;
		}
	}
};
ScreenKeyboard.prototype._onResized = function(p_w, p_h){
	console.log('screen keyboard resized');

	var heightKoef = p_h / this._layout.height;
	var widthKoef = p_w / this._layout.width;

	//if (p_h > p_w){
	//	heightKoef = heightKoef * p_w / p_h;
	//}

	//if (heightKoef > widthKoef){
	//	heightKoef = widthKoef;
	//}
	var iBn, oBn, tmp;
	for (iBn = 0 ; iBn < this._buttons.length ; ++iBn){
		oBn = this._buttons[iBn];
		oBn.x1 = oBn.geometry.x * widthKoef;
		oBn.y1 = oBn.geometry.y * heightKoef;
		oBn.x2 = oBn.geometry.w * widthKoef;
		oBn.y2 = oBn.geometry.h * heightKoef;
		tmp = oBn.e.style;
		tmp.top = '' + oBn.y1 + 'px';
		tmp.left = '' + oBn.x1 + 'px';
		tmp.width = '' + oBn.x2 + 'px';
		tmp.height = '' + oBn.y2 + 'px';
		oBn.x2 += oBn.x1;
		oBn.y2 += oBn.y1;
		this._buttons[iBn] = oBn;
	}
};

ScreenKeyboard.prototype._hitButton = function(p_x, p_y){
	var bn;
	for (bn of this._buttons){
		if (p_y >= bn.y1 && p_y < bn.y2){
			if (p_x >= bn.x1 && p_x < bn.x2){
				return bn;
			}
		}
	}
};

ScreenKeyboard.prototype._generateKeyEvent = function(p_button, p_modifier){

	var keyCode;
	var tmp;
	if (p_modifier === 'win'){
		if ('qwertyuiopasdfghjklzxcvbnm'.indexOf(p_button.image) >= 0){
			if (p_button.image !== this._currentTty){
				this._currentTty = p_button.image;
				tmp = this._username + ':' + this._currentTty;
				this._socket.send(
					JSON.stringify(
						{
							data:  String.fromCharCode.apply(undefined, [1,100]) // [1,100] is "Ctrl+a, d"
						}
					)
				);

				// protect if there was not screen session activated (e.g. closed by user)
				this._socket.send(
					JSON.stringify(
						{
							data:  '\r'
						}
					)
				);

				this._socket.send(
					JSON.stringify(
						{
							data:  'screen -r ' + tmp + ' || screen -S ' + tmp + '\r'
						}
					)
				);
			}
		}
	}
	else{
		keyCode = p_button.keyCode[p_modifier || 'normal'];
		if (!keyCode || !keyCode.length){ // default value if not specified
			keyCode = p_button.keyCode['normal'];
		}
		if (keyCode && keyCode.length){
			if (this._terminalMode === 1){
				if (keyCode.length === 3)
				{
					if (keyCode[1] === 91){
						keyCode[1] = 79;
					}
				}
			}
			this._socket.send(
				JSON.stringify(
					{
						data: String.fromCharCode.apply(undefined, keyCode)
					}
				)
			);
		}
	}
};

ScreenKeyboard.prototype._updateKeyImages = function(){
	var pathPrefix = 'static/img/screenkeyboard/';
	if (this._currentLanguage){
		pathPrefix += this._currentLanguage + '/';
	}
	var tmp;
	for (let bn of this._buttons){
		tmp = pathPrefix;
		if (this._currentModifier === 'shift'){
			tmp += (bn.shift_image || bn.image);
		}
		else{
			tmp += bn.image;
		}
		tmp += '.png';
		//this._terminal.write('*' + tmp + '*\n');//
		bn.e.src = tmp;
	}
};
