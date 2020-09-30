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
		width: 47,
height: 17,
rows: [ // rows
	{
		height: 2,
		buttons: [
			// button: if id not set, use "text" field value instead
			{ width: 3, subitems: [ { text: "esc", keycode: { normal: [ 27 ], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f1", keycode: { normal: [ 27,79,80 ], shift: [ 27,91,49,59,50,80 ], alt: [ 27,91,49,59,51,80 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f2", keycode: { normal: [ 27,79,81 ], shift: [ 27,91,49,59,50,81 ], alt: [ 27,91,49,59,51,81 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f3", keycode: { normal: [ 27,79,82 ], shift: [ 27,91,49,59,50,82 ], alt: [ 27,91,49,59,51,82 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f4", keycode: { normal: [ 27,79,83 ], shift: [ 27,91,49,59,50,83 ], alt: [ 27,91,49,59,51,83 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f5", keycode: { normal: [ 27,91,49,53,126 ], shift: [ 27,91,49,53,59,50,126 ], alt: [ 27,91,49,53,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f6", keycode: { normal: [ 27,91,49,55,126 ], shift: [ 27,91,49,55,59,50,126 ], alt: [ 27,91,49,55,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f7", keycode: { normal: [ 27,91,49,56,126 ], shift: [ 27,91,49,56,59,50,126 ], alt: [ 27,91,49,56,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f8", keycode: { normal: [ 27,91,49,57,126 ], shift: [ 27,91,49,57,59,50,126 ], alt: [ 27,91,49,57,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f9", keycode: { normal: [ 27,91,50,48,126 ], shift: [ 27,91,50,48,59,50,126 ], alt: [ 27,91,50,48,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f10", keycode: { normal: [ 27,91,50,49,126 ], shift: [ 27,91,50,49,59,50,126 ], alt: [ 27,91,50,49,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f11", keycode: { normal: [ 27,91,50,51,126 ], shift: [ 27,91,50,51,59,50,126 ], alt: [ 27,91,50,51,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f12", keycode: { normal: [ 27,91,50,52,126 ], shift: [ 27,91,50,52,59,50,126 ], alt: [ 27,91,50,52,59,51,126 ], ctrl: [] } } ] },
			{ width: 2 },
			{ width: 3, subitems: [ { text: "insert", keycode: { normal: [ 27,91,50,126 ], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "delete", keycode: { normal: [ 27,91,51,126 ], shift: [], alt: [], ctrl: [ 27,91,51,59,53,126 ] } } ] }
		]
	},
	{
		height: 3,
		buttons: [
			{ width: 3, subitems: [ { text: "backquote", shift_text: "tilda", keycode: { normal: [ 96 ], shift: [ 126 ], alt: [ 27,96 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "1", shift_text: "shift_1",  keycode: { normal: [ 49 ], shift: [ 33 ], alt: [ 27,49 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "2", shift_text: "shift_2", keycode: { normal: [ 50 ], shift: [ 64 ], alt: [ 27,50 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "3", shift_text: "shift_3", keycode: { normal: [ 51 ], shift: [ 35 ], alt: [ 27,51 ], ctrl: [ 27 ] } } ] },
			{ width: 3, subitems: [ { text: "4", shift_text: "shift_4", keycode: { normal: [ 52 ], shift: [ 36 ], alt: [ 27,52 ], ctrl: [ 28 ] } } ] },
			{ width: 3, subitems: [ { text: "5", shift_text: "shift_5", keycode: { normal: [ 53 ], shift: [ 37 ], alt: [ 27,53 ], ctrl: [ 29 ] } } ] },
			{ width: 3, subitems: [ { text: "6", shift_text: "shift_6", keycode: { normal: [ 54 ], shift: [ 94 ], alt: [ 27,54 ], ctrl: [ 30 ] } } ] },
			{ width: 3, subitems: [ { text: "7", shift_text: "shift_7", keycode: { normal: [ 55 ], shift: [ 38 ], alt: [ 27,55 ], ctrl: [ 31 ] } } ] },
			{ width: 3, subitems: [ { text: "8", shift_text: "shift_8", keycode: { normal: [ 56 ], shift: [ 42 ], alt: [ 27,56 ], ctrl: [ 127 ] } } ] },
			{ width: 3, subitems: [ { text: "9", shift_text: "shift_9", keycode: { normal: [ 57 ], shift: [ 40 ], alt: [ 27,57 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "0", shift_text: "shift_0", keycode: { normal: [ 48 ], shift: [ 41 ], alt: [ 27,48 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "defis", shift_text: "shift_defis", keycode: { normal: [ 45 ], shift: [ 95 ], alt: [ 27,45 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "equal", shift_text: "shift_equal", keycode: { normal: [ 61 ], shift: [ 43 ], alt: [ 27,61 ], ctrl: [] } } ] },
			{ width: 5, subitems: [ { text: "BS", keycode: { normal: [ 127 ], shift: [ 8 ], alt: [ 27,127 ], ctrl: [8] } } ] },
			{ width: 3, subitems: [ { text: "home", keycode: { normal: [ 27,91,72 ], shift: [ 27,91,49,59,50,72 ], alt: [ 27,91,49,59,51,72 ], ctrl: [ 27,91,49,59,53,72 ] } } ] }
		]
	},
	{
		height: 3,
		buttons: [
			{ width: 5, subitems: [ { text: "tab", keycode: { normal: [ 9 ], shift: [ 27,91,90 ], alt: [], ctrl: [ 0 ] } } ] },
			{ width: 3, subitems: [ { text: "q", keycode: { normal: [ 113 ], shift: [ 81 ], alt: [ 27,113 ], ctrl: [ 17 ] } } ] },
			{ width: 3, subitems: [ { text: "w", keycode: { normal: [ 119 ], shift: [ 87 ], alt: [ 27,119 ], ctrl: [ 23 ] } } ] },
			{ width: 3, subitems: [ { text: "e", keycode: { normal: [ 101 ], shift: [ 69 ], alt: [ 27,101 ], ctrl: [ 5 ] } } ] },
			{ width: 3, subitems: [ { text: "r", keycode: { normal: [ 114 ], shift: [ 82 ], alt: [ 27,114 ], ctrl: [ 18 ] } } ] },
			{ width: 3, subitems: [ { text: "t", keycode: { normal: [ 116 ], shift: [ 84 ], alt: [ 27,116 ], ctrl: [ 20 ] } } ] },
			{ width: 3, subitems: [ { text: "y", keycode: { normal: [ 121 ], shift: [ 89 ], alt: [ 27,121 ], ctrl: [ 25 ] } } ] },
			{ width: 3, subitems: [ { text: "u", keycode: { normal: [ 117 ], shift: [ 85 ], alt: [ 27,117 ], ctrl: [ 21 ] } } ] },
			{ width: 3, subitems: [ { text: "i", keycode: { normal: [ 105 ], shift: [ 73 ], alt: [ 27,105 ], ctrl: [ 9 ] } } ] },
			{ width: 3, subitems: [ { text: "o", keycode: { normal: [ 111 ], shift: [ 79 ], alt: [ 27,111 ], ctrl: [ 15 ] } } ] },
			{ width: 3, subitems: [ { text: "p", keycode: { normal: [ 112 ], shift: [ 80 ], alt: [ 27,112 ], ctrl: [ 16 ] } } ] },
			{ width: 3, subitems: [ { text: "figstart", shift_text: "shift_figstart", keycode: { normal: [ 91 ], shift: [ 123 ], alt: [ 27,91 ], ctrl: [ 27 ] } } ] },
			{ width: 3, subitems: [ { text: "figend", shift_text: "shift_figend", keycode: { normal: [ 93 ], shift: [ 125 ], alt: [ 27,93 ], ctrl: [ 29 ] } } ] },
			{ width: 3, subitems: [ { text: "backslash", shift_text: "shift_backslash", keycode: { normal: [ 92 ], shift: [ 124 ], alt: [ 27,92 ], ctrl: [ 28 ] } } ] },
			{ width: 3, subitems: [ { text: "PgUp", keycode: { normal: [ 27,91,53,126 ], shift: [], alt: [], ctrl: [27,91,53,59,53,126] } } ] }
		]
	},
	{
		height: 3,
		buttons: [
			{ width: 6, subitems: [ { text: "capslock", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "a", keycode: { normal: [ 97 ], shift: [ 65 ], alt: [ 27,97 ], ctrl: [ 1 ] } } ] },
			{ width: 3, subitems: [ { text: "s", keycode: { normal: [ 115 ], shift: [ 83 ], alt: [ 27,115 ], ctrl: [ 19 ] } } ] },
			{ width: 3, subitems: [ { text: "d", keycode: { normal: [ 100 ], shift: [ 68 ], alt: [ 27,100 ], ctrl: [ 4 ] } } ] },
			{ width: 3, subitems: [ { text: "f", keycode: { normal: [ 102 ], shift: [ 70 ], alt: [ 27,102 ], ctrl: [ 6 ] } } ] },
			{ width: 3, subitems: [ { text: "g", keycode: { normal: [ 103 ], shift: [ 71 ], alt: [ 27,103 ], ctrl: [ 7 ] } } ] },
			{ width: 3, subitems: [ { text: "h", keycode: { normal: [ 104 ], shift: [ 72 ], alt: [ 27,104 ], ctrl: [ 8 ] } } ] },
			{ width: 3, subitems: [ { text: "j", keycode: { normal: [ 106 ], shift: [ 74 ], alt: [ 27,106 ], ctrl: [ 10 ] } } ] },
			{ width: 3, subitems: [ { text: "k", keycode: { normal: [ 107 ], shift: [ 75 ], alt: [ 27,107 ], ctrl: [ 11 ] } } ] },
			{ width: 3, subitems: [ { text: "l", keycode: { normal: [ 108 ], shift: [ 76 ], alt: [ 27,108 ], ctrl: [ 12 ] } } ] },
			{ width: 3, subitems: [ { text: "colon", shift_text: "shift_colon", keycode: { normal: [ 59 ], shift: [ 58 ], alt: [ 27,59 ], ctrl: [ 59 ] } } ] },
			{ width: 3, subitems: [ { text: "quote", shift_text: "shift_quote", keycode: { normal: [ 39 ], shift: [ 34 ], alt: [ 27,39 ], ctrl: [ 39 ] } } ] },
			{ width: 5, subitems: [ { text: "enter", keycode: { normal: [ 13 ], shift: [], alt: [], ctrl: [13] } } ] },
			{ width: 3, subitems: [ { text: "PgDn", keycode: { normal: [ 27,91,54,126 ], shift: [], alt: [], ctrl: [27,91,54,59,53,126] } } ] }
		]
	},
	{
		height: 3,
		buttons: [
			{ width: 7, subitems: [ { text: "shift_left", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "z", keycode: { normal: [ 122 ], shift: [ 90 ], alt: [ 27,122 ], ctrl: [ 26 ] } } ] },
			{ width: 3, subitems: [ { text: "x", keycode: { normal: [ 120 ], shift: [ 88 ], alt: [ 27,120 ], ctrl: [ 24 ] } } ] },
			{ width: 3, subitems: [ { text: "c", keycode: { normal: [ 99 ], shift: [ 67 ], alt: [ 27,99 ], ctrl: [ 3 ] } } ] },
			{ width: 3, subitems: [ { text: "v", keycode: { normal: [ 118 ], shift: [ 86 ], alt: [ 27,118 ], ctrl: [ 22 ] } } ] },
			{ width: 3, subitems: [ { text: "b", keycode: { normal: [ 98 ], shift: [ 66 ], alt: [ 27,98 ], ctrl: [ 2 ] } } ] },
			{ width: 3, subitems: [ { text: "n", keycode: { normal: [ 110 ], shift: [ 78 ], alt: [ 27,110 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "m", keycode: { normal: [ 109 ], shift: [ 77 ], alt: [ 27,109 ], ctrl: [ 13 ] } } ] },
			{ width: 3, subitems: [ { text: "comma", shift_text: "shift_comma", keycode: { normal: [ 44 ], shift: [ 60 ], alt: [ 27,44 ], ctrl: [ 44 ] } } ] },
			{ width: 3, subitems: [ { text: "dot", shift_text: "shift_dot", keycode: { normal: [ 46 ], shift: [ 62 ], alt: [ 27,46 ], ctrl: [ 46 ] } } ] },
			{ width: 3, subitems: [ { text: "slash", shift_text: "shift_slash", keycode: { normal: [ 47 ], shift: [ 63 ], alt: [ 27,47 ], ctrl: [ 31 ] } } ] },
			{ width: 1 },
			{ width: 4, subitems: [ { text: "up", keycode: { normal: [27,91,65], shift: [27,91,49,59,50,65], alt: [27,91,49,51,66], ctrl: [27,91,49,59,53,65] } } ] },
			{ width: 2 },
			{ width: 3, subitems: [ { text: "end", keycode: { normal: [ 27,91,70 ], shift: [ 27,91,49,59,50,70 ], alt: [ 27,91,49,59,51,70 ], ctrl: [ 27,91,49,59,53,70 ] } } ] }
		]
	},
	{
		height: 3,
		buttons: [
			{ width: 4, subitems: [ { text: "ctrl_left", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 4, subitems: [ { text: "win_left", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 4, subitems: [ { text: "alt_left", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 16, subitems: [ { text: "space", keycode: { normal: [ 32 ], shift: [ 0 ], alt: [ 0 ], ctrl: [ 0 ] } } ] },
			{ width: 6 },
			{ width: 4, subitems: [ { text: "left", keycode: { normal: [ 27,91,68 ], shift: [ 27,91,49,59,50,68 ], alt: [ 27,91,49,59,51,68 ], ctrl: [ 27,91,49,59,53,68 ] } } ] },
			{ width: 4, subitems: [ { text: "down",	keycode: { normal: [ 27,91,66 ], shift: [ 27,91,49,59,50,66 ], alt: [ 27,91,49,51,66 ], ctrl: [ 27,91,49,59,53,66 ] } } ] },
			{ width: 4, subitems: [ { text: "right", keycode: { normal: [ 27,91,67 ], shift: [ 27,91,49,59,50,67 ], alt: [ 27,91,49,59,51,67 ], ctrl: [ 27,91,49,59,51,67 ] } } ] },
			{ width: 1 }
		]
	}
] // rows

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

			if (oButton.subitems && oButton.subitems.length){
				/*if (!oButton.subitems.length)
				{
					console.error("incorrect empty set of buttons in columns");
					return;
				}*/
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
	var
		REPEAT_INTERVAL = 50, // in ms
		REPEAT_THREASHOLD = 10, // in tacts
		prevX,
		prevY,
		prevOpacity = 0.3,
		curScrollPos = 0,
		prevScrollPos = 0,
		modifier,
		bn,
		repeatCounter = 0
	;

	self._terminal.onScroll(function(p_pos){curScrollPos = p_pos;});

	function processDraging(dx, dy){
		var
			CONST_DISTANCE_THRESHOLD = 5,
			dist = dx * dx + dy * dy,
			angle
		;
		if (!dx || !dy)
			return;
		if (dist > 50000) {
			angle = dx * 100;
			if (angle < (16 * Math.abs(dy))) {
				angle = 0;
			}
			else if (angle < (32 * Math.abs(dy))) {
				angle = 1;
			}
			else if (angle < (51 * Math.abs(dy))) {
				angle = 2;
			}
			else if (angle < (73 * Math.abs(dy))) {
				angle = 3;
			}
			else if (angle < (100 * Math.abs(dy))) {
				angle = 4;
			}
			else if (angle < (138 * Math.abs(dy))) {
				angle = 5;
			}
			else if (angle < (196 * Math.abs(dy))) {
				angle = 6;
			}
			else if (angle < (308 * Math.abs(dy))) {
				angle = 7;
			}
			else if (angle < (631 * Math.abs(dy))) {
				angle = 8;
			}
			else {
				angle = 9;
			}

			self.setOpacity(angle / 10);
		}
		else {
			self.setOpacity(prevOpacity);
		}
	}
	/* States:
		0 - normal
		1 - pressed
		2 - released (process click)
		3 - pressed second key (we\ll don't wait release event - we already have two keys)
		4 - moving
		5 - released (process dragging)
		6 - repeating (two keys pressed)
	*/
	var state = 0;
	function processEvent(e, p){ // e: 100 - pressed, 200 - moved, 300 - released, 400 - timerTick (reserved)
		var
			x,
			y,
			bnPrev
		;
		if (e !== 400){
			x = p[0].pageX;
			y = p[0].pageY;
		}
		if (e !== 400){
			//self._terminal.write(`[${state}-${e}]`);//
		}

		if (state === 0){
			if (e === 100){
				prevX = x;
				prevY = y;
				prevScrollPos = curScrollPos;
				prevOpacity = self.opacity();
				if (bn = self._hitButton(x, y)){
					if (modifier = self._currentModifier = bn.modifier){
						self._updateKeyImages();
						state = 1;
					}
					else{
						repeatCounter = 0;
						self._generateKeyEvent(bn, modifier); // null modifier
					}
				}
			}
			else if (e === 200){ // ignore
				/*if (prevX !== x || prevY !== y){
					repeatCounter = -1;
				}*/
				tmp = self._hitButton(prevX, prevY);

				if (tmp !== self._hitButton(x, y)){
					bn = tmp;
					repeatCounter = -1;
					//state = 4; // boris e: remove this part
				}
			}
			else if (e === 300){ // ignore
				repeatCounter = -1;
			}
			else if (e == 400){
				// thinning and press-repeating here
				if (repeatCounter >= 0){
					if (++repeatCounter > REPEAT_THREASHOLD){
						self._generateKeyEvent(bn, modifier);// null modifier
					}
				}
			}
		}
		else if (state === 1){
			if (e === 100){ // two keys: only MODIFIER + ORDINARY_KEY
				prevX = x;
				prevY = y;
				if (bn = self._hitButton(x,y)){
					if (!bn.modifier){
						self._generateKeyEvent(bn, modifier);
						repeatCounter = 0;
					}
				}
			}
			else if (e === 200){
				if (!modifier){
					tmp = self._hitButton(prevX, prevY);

					if (tmp !== self._hitButton(x, y)){
						if (p[1]){
							state = 6;
						}
						else {
							bn = tmp;
							repeatCounter = -1;
							state = 4;
						}
					}
				}
			}
			else if (e === 300){
				if (bn = self._hitButton(x,y)){
					if (bn.modifier){
						modifier = self._currentModifier = undefined;
						self._updateKeyImages();
						state = 0;
					}
				}
				repeatCounter = -1;
			}
			else if (e === 400){
				if (repeatCounter >= 0){
					if (++repeatCounter > REPEAT_THREASHOLD){
						self._generateKeyEvent(bn, modifier);// null modifier
					}
				}
			}
		}
		else if (state === 2){
			if (e === 100){
			}
			else if (e === 200){
			}
			else if (e === 300){
				self._generateKeyEvent(bn, modifier);
				if (modifier){
					modifier = undefined;
					self._currentModifier = undefined;
					self._updateKeyImages();
				}
				state = 0
			}
			else if (e === 400){
			}
		}
		else if (state === 3){
			state = 0;
		}
		else if (state === 4){
			if (e === 100){
			}
			else if (e === 200){
			}
			else if (e === 300){
				state = 5;
			}
			else if (e === 400){
			}
		}
		else if (state === 6){
			if (e === 100){
				prevX = x;
				prevY = y;
				if (bn = self._hitButton(x,y)){
					if (!bn.modifier){
						self._generateKeyEvent(bn, modifier);
						repeatCounter = 0;
					}
				}
				/*
				tmp = self._hitButton(prevX, prevY);

				if (tmp !== self._hitButton(x, y)){
					bn = tmp;
					repeatCounter = -1;
					//state = 4; // boris e: remove this part
				}
				*/
			}
			else if (e === 200){
			}
			else if (e === 300){
				if (bn = self._hitButton(x,y)){
					if (bn.modifier){
						modifier = self._currentModifier = undefined;
						self._updateKeyImages();
						state = 0;
					}
				}
				repeatCounter = -1;
			}
			else if (e === 400){
				if (repeatCounter >= 0){
					if (++repeatCounter > REPEAT_THREASHOLD){
						self._generateKeyEvent(bn, modifier);// null modifier
					}
				}
			}
		}

		if ((state === 4) || (state === 5)){
			if (bn.image === 'ctrl_left'){
				processDraging(x - prevX, y - prevY);
			}
			if (state === 5){
				state = 0;
				prevOpacity = self.opacity();
			}
		}
	}

	var consol = {};
	consol.log = function(p){
		console.log(p);
		self._terminal.write(p + '\t');
	};

	tmp.addEventListener('touchstart', function(e){
		processEvent(100, e.changedTouches);
		e.preventDefault();
		return false;
	});
	tmp.addEventListener('touchend', function(e){
		processEvent(300, e.changedTouches);
		e.preventDefault();
		return false;
	});
	tmp.addEventListener('touchmove', function(e){
		processEvent(200, e.changedTouches);
		e.preventDefault();
		return false;
	});
	setInterval(function(){processEvent(400);}, REPEAT_INTERVAL);
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
	(function(self){
		var tmp = self._username + ':'
 + self._currentTty;
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
	//else if ((this._terminalMode === 0) && p_modifier === 'shift' && (['home','end','PgUp','PgDn','up','down'].indexOf(p_button.image) >= 0)){
	else if (p_modifier === 'shift' && (['home','end','PgUp','PgDn','up','down'].indexOf(p_button.image) >= 0)){//
		//this._terminal.write('+(' + this._terminalMode + ')');
		if (p_button.image === 'up'){
			this._terminal.scrollLines(-1);
		}
		else if (p_button.image === 'down'){
			this._terminal.scrollLines(1);
		}
		else if (p_button.image === 'PgUp'){
			this._terminal.scrollPages(-1);
		}
		else if (p_button.image === 'PgDn'){
			this._terminal.scrollPages(1);
		}
		else if (p_button.image === 'home'){
			this._terminal.scrollToLine(0);
		}
		else if (p_button.image === 'end'){
			this._terminal.scrollToBottom();
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
