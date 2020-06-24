//'use strict';

/*
Class ScreenKeyboard.
set Visible by method setVisible(boolean p_on). Invisible by default.
call setLayout(string p_layout) to set keyboard layout (e.g. 'en', 'ru', 'italian' &etc.)
*/
//var aaaa = document.create('div');
//aaaa.innerHTML = 'aaaa';
//document.body.appendChild(aaaa);

function ScreenKeyboard(p_terminal, p_socket){
	this._terminalMode = 0; // 0 - bracketed paste mode OFF, 1 - bracketed paste mode ON
	this._terminal = p_terminal;
	this._socket = p_socket;
	this._layout = {
		{%% baseLayout.js %%}
	};
	this._currentModifier = 'normal';
	this._modifiers = {
		'shift_left': 'shift',
		'shift_right': 'shift',
		'ctrl_left': 'ctrl',
		'ctrl_right': 'ctrl',
		'alt_left': 'alt',
		'alt_right': 'alt'
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

	this._buttons = {};

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

				this._buttons[oSubitem.text] = {
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
					keyCode: oSubitem.keycode,
					modifier: this._modifiers[oSubitem.text]
				};

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
	(function(self){
		//tmp.addEventListener('click', function(e){console.log('clicked');e.preventDefault();});
		var prevX, prevY, dx, dy, prevOpacity = 0.3;
		var curScrollPos = 0, prevScrollPos = 0;
		var isMoved;

		self._terminal.onScroll(function(p_pos){curScrollPos = p_pos;});

		function processDraging(touches){
			var
				dx = touches[0].pageX - prevX,
				dy = touches[0].pageY - prevY,
				CONST_THRES_KOEF = 5,
				CONST_WIDTH_KOEF = 0.7,
				tmp
			;
			//consol.log(`e{${dx}:${dy}}`);
			//consol.log('**' + self._terminal.rows); // boris e
			if (Math.abs(dy) > CONST_THRES_KOEF * Math.abs(dx)){
				//consol.log(`scroll{${dx}:${dy}}`);
				tmp = parseInt(dy * self._terminal.rows / window.innerHeight); // tmp - rows deviation relatively of prevScrollPos
				tmp = prevScrollPos - tmp;
				if (tmp < 0)
					tmp = 0;
				self._terminal.scrollToLine(tmp);
			}
			else if (Math.abs(dx) > CONST_THRES_KOEF * Math.abs(dy)){
				tmp = dx / (window.innerWidth * CONST_WIDTH_KOEF);
				if (tmp = parseInt(tmp * 100)){
					tmp = prevOpacity + tmp / 100;
					if (tmp >= 0 || tmp <= 1){
						self.setOpacity(tmp);
					}
				}
			}
		}
		function processClick(touches){
			var
				x = touches[0].pageX,
				y = touches[0].pageY,
				tmp
			;
			//consol.log(`x: ${x}, y: ${y}`);
			self._generateKeyEvent(x, y);
		}


		var consol = {};
		consol.log = function(p){
			console.log(p);
			self._terminal.write(p + '\t');
		};

		tmp.addEventListener('touchstart', function(e){
			//consol.log('touchstart(1):' + JSON.stringify(e.changedTouches));
			//consol.log('touchstart(2):' + JSON.stringify(e.changedTouches[0].pageX));
			prevX = e.changedTouches[0].pageX;
			prevY = e.changedTouches[0].pageY;
			prevScrollPos = curScrollPos;
			prevOpacity = self.opacity();
			isMoved = false;
			e.preventDefault();
			return false;
		});
		tmp.addEventListener('touchend', function(e){
			//consol.log('touchend' + JSON.stringify(e.changedTouches));
			var
				dx = e.changedTouches[0].pageX - prevX,
				dy = e.changedTouches[0].pageY - prevY
			;
			if (isMoved){ // process draging
				//consol.log('process draging');
				processDraging(e.changedTouches);
			}
			else{ // process click
				//consol.log('process click');
				processClick(e.changedTouches);
			}
			e.preventDefault();
			return false;
		});
		tmp.addEventListener('touchmove', function(e){
			var
				dx = e.changedTouches[0].pageX - prevX,
				dy = e.changedTouches[0].pageY - prevY
			;
			/*consol.log('mouse moved' + JSON.stringify(e.changedTouches));
			var
				x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY
			;*/
			processDraging(e.changedTouches);
			isMoved = true;
			e.preventDefault();
			return false;
		});
	})(this);
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
	var i, bn;
	for (i in this._buttons){
		bn = this._buttons[i];
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
	if (p_data.indexOf('?2004') >= 0){
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
			else if (state === 5 && ch === 48)
				state = 6;
			else if (state === 6 && ch === 52)
				state = 7;
			else if (state === 7){
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
	}
};
ScreenKeyboard.prototype._onResized = function(p_w, p_h){
	console.log('screen keyboard resized');

	var heightKoef = p_h / this._layout.height;
	var widthKoef = p_w / this._layout.width;

	/*if (p_h > p_w){
		heightKoef = heightKoef * p_w / p_h;
	}*/

	if (heightKoef > widthKoef){
		heightKoef = widthKoef;
	}
	var iBn, oBn, tmp;
	for (iBn in this._buttons){
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

/*ScreenKeyboard.prototype._generateKeyEvent = function(p_event){
	var keyCode, keyId;
	var keyId = p_event.target.keyId;
	if (this._modifiers.hasOwnProperty(keyId)){
		if (this._currentModifier === 'normal'){
			this._currentModifier = this._modifiers[keyId];
		}
		else if (this._currentModifier === this._modifiers[keyId]){
			this._currentModifier = 'normal';
		}
		else{
			this._currentModifier = this._modifiers[keyId];
		}
	}

	console.log('key id: ', keyId);
	console.log('current modifier: ', this._currentModifier);
	keyCode = this._buttons[keyId].keyCode;
	keyCode = keyCode[this._currentModifier];
	if (keyCode.length)
	{
		this._socket.send(
			JSON.stringify(
				{
					data: String.fromCharCode.apply(undefined, keyCode)
				}
			)
		);
	}
};*/

ScreenKeyboard.prototype._generateKeyEvent = function(p_x, p_y){
	var keyCode, i, bn, bnTarget;
	for (i in this._buttons){
		bn = this._buttons[i];
		if (p_y >= bn.y1 && p_y < bn.y2){
			if (p_x >= bn.x1 && p_x < bn.x2){
				bnTarget = bn;
			}
		}
	}
	if (bnTarget){
		if (bnTarget.modifier){
			if (this._currentModifier === 'normal'){
				this._currentModifier = bnTarget.modifier;
			}
			else if (this._currentModifier === bnTarget.modifier){
				this._currentModifier = 'normal';
			}
			else{
				this._currentModifier = bnTarget.modifier;
			}
		}
		keyCode = bnTarget.keyCode[this._currentModifier];
		if (this._terminalMode == 1){
			if (keyCode.length === 3)
			{
				if (keyCode[1] === 91){
					keyCode[1] = 79;
				}
			}
		}
		if (!bnTarget.modifier){
			this._currentModifier = 'normal';
		}
		if (keyCode.length)
		{
			this._socket.send(
				JSON.stringify(
					{
						data: String.fromCharCode.apply(undefined, keyCode)
					}
				)
			);
		}
	}
	// else report warning
};
