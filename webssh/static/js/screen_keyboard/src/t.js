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
	console.log('######### ', term);//
	var fGenerateKeyEvent = (function(term){
		return function(p_event){
			var keyId = p_event.target.keyId;
			//term.write(keyId);
			//term.write('\nls\n');

			//wssh.send(JSON.stringify({data: keyId}));
			if (mapa.hasOwnProperty(keyId)){
				wssh.send(JSON.stringify({data: mapa[keyId]}));
			}
			//else if ('')

			//console.log('xx ' + p_event.target.innerHTML);
			p_event.preventDefault();
		}
	})(this._terminal); // function fGenerateKeyEvent
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
				bn.style.opacity = '0.3';
				//bn.style.background = `url("static/img/screenkeyboard/${oSubitem.text}.png")`; // boris here
				//bn.innerHTML = oSubitem.text;
				bn.className = 'keyboard__key';
				bn.keyId = oSubitem.text;

				this._eContainer.appendChild(bn);
				bn.addEventListener('click', (function(p_self){return function(p_event){
					ScreenKeyboard.prototype._generateKeyEvent.call(p_self, p_event);
				};})(this), false);

				this._buttons[oSubitem.text] = {
					e: bn,
					geometry: {
						x: xCell,
						y: yCell,
						w: wCell,
						h: hCell
					},
					keyCode: oSubitem.keycode
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
		var prevX, prevY, dx, dy;
		var isMoved;


		var consol = {};
		consol.log = function(p){
			console.log(p);
			self._terminal.write(p + '\t');
		};

		tmp.addEventListener('touchstart', function(e){
			//consol.log('touchstart(1):' + JSON.stringify(e.changedTouches));
			//consol.log('touchstart(2):' + JSON.stringify(e.changedTouches[0].pageX));
			var
				x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY
			;
			prevX = x;
			prevY = y;
			isMoved = false;
			e.preventDefault();
			return false;
		});
		tmp.addEventListener('touchend', function(e){
			//consol.log('touchend' + JSON.stringify(e.changedTouches));
			var
				x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY
			;
			if (isMoved){ // process draging
				consol.log('process draging');
			}
			else{ // process click
				consol.log('process click');
			}
			e.preventDefault();
			return false;
		});
		tmp.addEventListener('touchmove', function(e){
			/*consol.log('mouse moved' + JSON.stringify(e.changedTouches));
			var
				x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY
			;*/
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
ScreenKeyboard.prototype.setLayout = function(p_layout){
	console.log('set keyboard layout: ', p_layout);
};
ScreenKeyboard.prototype._onResized = function(p_w, p_h){
	console.log('screen keyboard resized');

	const heightKoef = p_h / this._layout.height;
	const widthKoef = p_w / this._layout.width;
	var iBn, oBn, tmp;
	for (iBn in this._buttons){
		oBn = this._buttons[iBn];
		tmp = oBn.e.style;
		tmp.top = '' + (oBn.geometry.y * heightKoef) + 'px';
		tmp.left = '' + (oBn.geometry.x * widthKoef) + 'px';
		tmp.width = '' + (oBn.geometry.w * widthKoef) + 'px';
		tmp.height = '' + (oBn.geometry.h * heightKoef) + 'px';
	}
};

ScreenKeyboard.prototype._generateKeyEvent = function(p_event){
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
};
