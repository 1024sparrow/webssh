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
		width: 48,
		height: 18,
		rows: [ // rows
			{
				height: 2,
				buttons: [
					// button: if id not set, use "text" field value instead
					{ width: 3, subitems: [ { text: "Esc" }, keycode: { normal: [ 27 ], shift: [], alt: [], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F1" }, keycode: { normal: [ 27,79,80 ], shift: [ 27,91,49,59,50,80 ], alt: [ 27,91,49,59,51,80 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F2" }, keycode: { normal: [ 27,79,81 ], shift: [ 27,91,49,59,50,81 ], alt: [ 27,91,49,59,51,81 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F3" }, keycode: { normal: [ 27,79,82 ], shift: [ 27,91,49,59,50,82 ], alt: [ 27,91,49,59,51,82 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F4" }, keycode: { normal: [ 27,79,83 ], shift: [ 27,91,49,59,50,83 ], alt: [ 27,91,49,59,51,83 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F5" }, keycode: { normal: [ 27,91,49,53,126 ], shift: [ 27,91,49,53,59,50,126 ], alt: [ 27,91,49,53,59,51,126 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F6" }, keycode: { normal: [ 27,91,49,55,126 ], shift: [ 27,91,49,55,59,50,126 ], alt: [ 27,91,49,55,59,51,126 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F7" }, keycode: { normal: [ 27,91,49,56,126 ], shift: [ 27,91,49,56,59,50,126 ], alt: [ 27,91,49,56,59,51,126 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F8" }, keycode: { normal: [ 27,91,49,57,126 ], shift: [ 27,91,49,57,59,50,126 ], alt: [ 27,91,49,57,59,51,126 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F9" }, keycode: { normal: [ 27,91,50,48,126 ], shift: [ 27,91,50,48,59,50,126 ], alt: [ 27,91,50,48,59,51,126 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F10" }, keycode: { normal: [ 27,91,50,49,126 ], shift: [ 27,91,50,49,59,50,126 ], alt: [ 27,91,50,49,59,51,126 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F11" }, keycode: { normal: [ 27,91,50,51,126 ], shift: [ 27,91,50,51,59,50,126 ], alt: [ 27,91,50,51,59,51,126 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "F12" }, keycode: { normal: [ 27,91,50,52,126 ], shift: [ 27,91,50,52,59,50,126 ], alt: [ 27,91,50,52,59,51,126 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "PrtSc" }, keycode: { normal: [], shift: [], alt: [], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "Ins" }, keycode: { normal: [ 27,91,50,126 ], shift: [], alt: [], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "Del" }, keycode: { normal: [ 27,91,51,126 ], shift: [], alt: [], ctrl: [ 27,91,51,59,53,126 ] } ] }
				]
			},
			{
				height: 3,
				buttons: [
					{ width: 3, subitems: [ { text: "` ~" }, keycode: { normal: [ 96 ], shift: [ 126 ], alt: [ 27,96 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "1 !" }, keycode: { normal: [ 49 ], shift: [ 33 ], alt: [ 27,49 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "2 @" }, keycode: { normal: [ 50 ], shift: [ 64 ], alt: [ 27,50 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "3 #" }, keycode: { normal: [ 51 ], shift: [ 35 ], alt: [ 27,51 ], ctrl: [ 27 ] } ] },
					{ width: 3, subitems: [ { text: "4 $" }, keycode: { normal: [ 52 ], shift: [ 36 ], alt: [ 27,52 ], ctrl: [ 28 ] } ] },
					{ width: 3, subitems: [ { text: "5 %" }, keycode: { normal: [ 53 ], shift: [ 37 ], alt: [ 27,53 ], ctrl: [ 29 ] } ] },
					{ width: 3, subitems: [ { text: "6 ^" }, keycode: { normal: [ 54 ], shift: [ 94 ], alt: [ 27,54 ], ctrl: [ 30 ] } ] },
					{ width: 3, subitems: [ { text: "7 &" }, keycode: { normal: [ 55 ], shift: [ 38 ], alt: [ 27,55 ], ctrl: [ 31 ] } ] },
					{ width: 3, subitems: [ { text: "8 *" }, keycode: { normal: [ 56 ], shift: [ 42 ], alt: [ 27,56 ], ctrl: [ 127 ] } ] },
					{ width: 3, subitems: [ { text: "9 (" }, keycode: { normal: [ 57 ], shift: [ 40 ], alt: [ 27,57 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "0 )" }, keycode: { normal: [ 48 ], shift: [ 41 ], alt: [ 27,48 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "- _" }, keycode: { normal: [ 45 ], shift: [ 95 ], alt: [ 27,45 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "= +" }, keycode: { normal: [ 61 ], shift: [ 43 ], alt: [ 27,61 ], ctrl: [] } ] },
					{ width: 6, subitems: [ { text: "BS" }, keycode: { normal: [ 127 ], shift: [ 8 ], alt: [ 27,127 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "Home" }, keycode: { normal: [ 27,91,72 ], shift: [ 27,91,49,59,50,72 ], alt: [ 27,91,49,59,51,72 ], ctrl: [ 27,91,49,59,53,72 ] } ] }
				]
			},
			{
				height: 3,
				buttons: [
					{ width: 4, subitems: [ { text: "Tab" }, keycode: { normal: [ 9 ], shift: [ 27,91,90 ], alt: [], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "Q" }, keycode: { normal: [ 113 ], shift: [ 81 ], alt: [ 27,113 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "W" }, keycode: { normal: [ 119 ], shift: [ 87 ], alt: [ 27,119 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "E" }, keycode: { normal: [ 101 ], shift: [ 69 ], alt: [ 27,101 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "R" }, keycode: { normal: [ 114 ], shift: [ 82 ], alt: [ 27,114 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "T" }, keycode: { normal: [ 116 ], shift: [ 84 ], alt: [ 27,116 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "Y" }, keycode: { normal: [ 121 ], shift: [ 89 ], alt: [ 27,121 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "U" }, keycode: { normal: [ 117 ], shift: [ 85 ], alt: [ 27,117 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "I" }, keycode: { normal: [ 105 ], shift: [ 73 ], alt: [ 27,105 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "O" }, keycode: { normal: [ 111 ], shift: [ 79 ], alt: [ 27,111 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "P" }, keycode: { normal: [ 112 ], shift: [ 80 ], alt: [ 27,112 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "[ {" }, keycode: { normal: [ 91 ], shift: [ 123 ], alt: [ 27,91 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "] }" }, keycode: { normal: [ 93 ], shift: [ 125 ], alt: [ 27,93 ], ctrl: [ 0 ] } ] },
					{ width: 5, subitems: [ { text: "\\ |" }, keycode: { normal: [ 92 ], shift: [ 124 ], alt: [ 27,92 ], ctrl: [ 0 ] } ] },
					{ width: 3, subitems: [ { text: "PgUp" }, keycode: { normal: [ 27,91,53,126 ], shift: [], alt: [], ctrl: [] } ] }
				]
			},
			{
				height: 3,
				buttons: [
					{ width: 5, subitems: [ { text: "Caps" }, keycode: { normal: [], shift: [], alt: [], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "A" }, keycode: { normal: [ 97 ], shift: [ 65 ], alt: [ 27,97 ], ctrl: [ 1 ] } ] },
					{ width: 3, subitems: [ { text: "S" }, keycode: { normal: [ 115 ], shift: [ 83 ], alt: [ 27,115 ], ctrl: [ 19 ] } ] },
					{ width: 3, subitems: [ { text: "D" }, keycode: { normal: [ 100 ], shift: [ 68 ], alt: [ 27,100 ], ctrl: [ 4 ] } ] },
					{ width: 3, subitems: [ { text: "F" }, keycode: { normal: [ 102 ], shift: [ 70 ], alt: [ 27,102 ], ctrl: [ 6 ] } ] },
					{ width: 3, subitems: [ { text: "G" }, keycode: { normal: [ 103 ], shift: [ 71 ], alt: [ 27,103 ], ctrl: [ 7 ] } ] },
					{ width: 3, subitems: [ { text: "H" }, keycode: { normal: [ 104 ], shift: [ 72 ], alt: [ 27,104 ], ctrl: [ 8 ] } ] },
					{ width: 3, subitems: [ { text: "J" }, keycode: { normal: [ 106 ], shift: [ 74 ], alt: [ 27,106 ], ctrl: [ 10 ] } ] },
					{ width: 3, subitems: [ { text: "K" }, keycode: { normal: [ 107 ], shift: [ 75 ], alt: [ 27,107 ], ctrl: [ 11 ] } ] },
					{ width: 3, subitems: [ { text: "L" }, keycode: { normal: [ 108 ], shift: [ 76 ], alt: [ 27,108 ], ctrl: [ 12 ] } ] },
					{ width: 3, subitems: [ { text: "; :" }, keycode: { normal: [ 59 ], shift: [ 58 ], alt: [ 27,59 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "' \"" }, keycode: { normal: [ 39 ], shift: [ 34 ], alt: [ 27,39 ], ctrl: [] } ] },
					{ width: 7, subitems: [ { text: "Ent" }, keycode: { normal: [ 13 ], shift: [], alt: [], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "PgDn" }, keycode: { normal: [ 27,91,54,126 ], shift: [], alt: [], ctrl: [] } ] }
				]
			},
			{
				height: 3,
				buttons: [
					{ width: 6, subitems: [ { text: "ShL" }, keycode: { normal: [], shift: [], alt: [], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "Z" }, keycode: { normal: [ 122 ], shift: [ 90 ], alt: [ 27,122 ], ctrl: [ 26 ] } ] },
					{ width: 3, subitems: [ { text: "X" }, keycode: { normal: [ 120 ], shift: [ 88 ], alt: [ 27,120 ], ctrl: [ 24 ] } ] },
					{ width: 3, subitems: [ { text: "C" }, keycode: { normal: [ 99 ], shift: [ 67 ], alt: [ 27,99 ], ctrl: [ 3 ] } ] },
					{ width: 3, subitems: [ { text: "V" }, keycode: { normal: [ 118 ], shift: [ 86 ], alt: [ 27,118 ], ctrl: [ 22 ] } ] },
					{ width: 3, subitems: [ { text: "B" }, keycode: { normal: [ 98 ], shift: [ 66 ], alt: [ 27,98 ], ctrl: [ 2 ] } ] },
					{ width: 3, subitems: [ { text: "N" }, keycode: { normal: [ 110 ], shift: [ 78 ], alt: [ 27,110 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "M" }, keycode: { normal: [ 109 ], shift: [ 77 ], alt: [ 27,109 ], ctrl: [ 13 ] } ] },
					{ width: 3, subitems: [ { text: ", <" }, keycode: { normal: [ 44 ], shift: [ 60 ], alt: [ 27,44 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: ". >" }, keycode: { normal: [ 46 ], shift: [ 62 ], alt: [ 27,46 ], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "/ ?" }, keycode: { normal: [ 47 ], shift: [ 63 ], alt: [ 27,47 ], ctrl: [] } ] },
					{ width: 9, subitems: [ { text: "ShR" }, keycode: { normal: [], shift: [], alt: [], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "End" }, keycode: { normal: [ 27,91,70 ], shift: [ 27,91,49,59,50,70 ], alt: [ 27,91,49,59,51,70 ], ctrl: [ 27,91,49,59,53,70 ] } ] }
				]
			},
			{
				height: 4,
				buttons: [
					{ width: 4, subitems: [ { text: "CtrlL" }, keycode: { normal: [], shift: [], alt: [], ctrl: [] } ] },
					{ width: 4, subitems: [ { text: "WinL" }, keycode: { normal: [], shift: [], alt: [], ctrl: [] } ] },
					{ width: 4, subitems: [ { text: "AltL" }, keycode: { normal: [], shift: [], alt: [], ctrl: [] } ] },
					{ width: 16, subitems: [ { text: "Space" }, keycode: { normal: [ 0 ], shift: [ 0 ], alt: [ 0 ], ctrl: [ 0 ] } ] },
					{ width: 4, subitems: [ { text: "AltR" }, keycode: { normal: [], shift: [], alt: [], ctrl: [] } ] },
					{ width: 4, subitems: [ { text: "WinR" }, keycode: { normal: [], shift: [], alt: [], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "CtrlR" }, keycode: { normal: [], shift: [], alt: [], ctrl: [] } ] },
					{ width: 3, subitems: [ { text: "<-" }, keycode: { normal: [ 27,91,68 ], shift: [ 27,91,49,59,50,68 ], alt: [ 27,91,49,59,51,68 ], ctrl: [ 27,91,49,59,53,68 ] } ] },
					{ width: 3, subitems: [
						{ text: "Up",	keycode: { normal: [ 27,91,65 ], shift: [ 27,91,49,59,50,65 ], alt: [ 27,91,49,51,65 ], ctrl: [ 27,91,49,59,53,65 ] } },
						{ text: "Down",	keycode: { normal: [ 27,91,66 ], shift: [ 27,91,49,59,50,66 ], alt: [ 27,91,49,51,66 ], ctrl: [ 27,91,49,59,53,66 ] } },
					] },
					{ width: 3, subitems: [ { text: "->" }, keycode: { normal: [ 27,91,67 ], shift: [ 27,91,49,59,50,67 ], alt: [ 27,91,49,59,51,67 ], ctrl: [ 27,91,49,59,51,67 ] } ] }
				]
			}
		] // rows
	}; // this._layout
	console.log('######### ', term);//
	var fGenerateKeyEvent = (function(term){
		var mapa = {
			'` ~': '`',
			'1 !': '1',
			'2 @': '2',
			'3 #': '3',
			'4 $': '4',
			'5 %': '5',
			'6 ^': '6',
			'7 &': '7',
			'8 *': '8',
			'9 (': '9',
			'0 )': '0',
			'- _': '-',
			'= +': '=',
			'BS': '\x1b[D',
			'Tab': '	',
			'Q': 'q',
			'W': 'w',
			'E': 'e',
			'R': 'r',
			'T': 't',
			'Y': 'y',
			'U': 'u',
			'I': 'i',
			'O': 'o',
			'P': 'p',
			'[ {': '[',
			'] }': ']',
			'A': 'a',
			'S': 's',
			'D': 'd',
			'F': 'f',
			'G': 'g',
			'H': 'h',
			'J': 'j',
			'K': 'k',
			'L': 'l',
			'; :': ';',
			'\' "': '\'',
			'Ent': '\n',
			'Z': 'z',
			'X': 'x',
			'C': 'c',
			'V': 'v',
			'B': 'b',
			'N': 'n',
			'M': 'm',
			', <': ',',
			'. >': '.',
			'/ ?': '/',
			'': '',
		};
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
	tmp.position = 'absolute';
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
				bn = document.createElement('div');
				bn.innerHTML = oSubitem.text;
				bn.className = 'keyboard__key';
				bn.keyId = oSubitem.text;

				this._eContainer.appendChild(bn);
				//bn.addEventListener('click', fGenerateKeyEvent, false);
				// boris here
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
					}
				};

				yCell += hCell;
			}
			xCell += wCell;
		}
		yRow += hRow;
	}

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
	// boris here: мы должны найти соответствующее описание кнопки
};
