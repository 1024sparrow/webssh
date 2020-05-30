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
					{ width: 3, subitems: [ { text: "Esc" } ] },
					{ width: 3, subitems: [ { text: "F1" } ] },
					{ width: 3, subitems: [ { text: "F2" } ] },
					{ width: 3, subitems: [ { text: "F3" } ] },
					{ width: 3, subitems: [ { text: "F4" } ] },
					{ width: 3, subitems: [ { text: "F5" } ] },
					{ width: 3, subitems: [ { text: "F6" } ] },
					{ width: 3, subitems: [ { text: "F7" } ] },
					{ width: 3, subitems: [ { text: "F8" } ] },
					{ width: 3, subitems: [ { text: "F9" } ] },
					{ width: 3, subitems: [ { text: "F10" } ] },
					{ width: 3, subitems: [ { text: "F12" } ] },
					{ width: 3, subitems: [ { text: "F13" } ] },
					{ width: 3, subitems: [ { text: "PrtSc" } ] },
					{ width: 3, subitems: [ { text: "Ins" } ] },
					{ width: 3, subitems: [ { text: "Del" } ] }
				]
			},
			{
				height: 3,
				buttons: [
					{ width: 3, subitems: [ { id: "`", text: "` ~" } ] },
					{ width: 3, subitems: [ { id: "1", text: "1 !" } ] },
					{ width: 3, subitems: [ { id: "2", text: "2 @" } ] },
					{ width: 3, subitems: [ { id: "3", text: "3 #" } ] },
					{ width: 3, subitems: [ { id: "4", text: "4 $" } ] },
					{ width: 3, subitems: [ { id: "5", text: "5 %" } ] },
					{ width: 3, subitems: [ { id: "6", text: "6 ^" } ] },
					{ width: 3, subitems: [ { id: "7", text: "7 &" } ] },
					{ width: 3, subitems: [ { id: "8", text: "8 *" } ] },
					{ width: 3, subitems: [ { id: "9", text: "9 (" } ] },
					{ width: 3, subitems: [ { id: "0", text: "0 )" } ] },
					{ width: 3, subitems: [ { id: "-", text: "- _" } ] },
					{ width: 3, subitems: [ { id: "=", text: "= +" } ] },
					{ width: 6, subitems: [ { id: "BS", text: "BS" } ] },
					{ width: 3, subitems: [ { id: "Home", text: "Home" } ] }
				]
			},
			{
				height: 3,
				buttons: [
					{ width: 4, subitems: [ { text: "Tab" } ] },
					{ width: 3, subitems: [ { text: "Q" } ] },
					{ width: 3, subitems: [ { text: "W" } ] },
					{ width: 3, subitems: [ { text: "E" } ] },
					{ width: 3, subitems: [ { text: "R" } ] },
					{ width: 3, subitems: [ { text: "T" } ] },
					{ width: 3, subitems: [ { text: "Y" } ] },
					{ width: 3, subitems: [ { text: "U" } ] },
					{ width: 3, subitems: [ { text: "I" } ] },
					{ width: 3, subitems: [ { text: "O" } ] },
					{ width: 3, subitems: [ { text: "P" } ] },
					{ width: 3, subitems: [ { text: "[ {" } ] },
					{ width: 3, subitems: [ { text: "] }" } ] },
					{ width: 5, subitems: [ { text: "\\ |" } ] },
					{ width: 3, subitems: [ { text: "PgUp" } ] }
				]
			},
			{
				height: 3,
				buttons: [
					{ width: 5, subitems: [ { text: "Caps" } ] },
					{ width: 3, subitems: [ { text: "A" } ] },
					{ width: 3, subitems: [ { text: "S" } ] },
					{ width: 3, subitems: [ { text: "D" } ] },
					{ width: 3, subitems: [ { text: "F" } ] },
					{ width: 3, subitems: [ { text: "G" } ] },
					{ width: 3, subitems: [ { text: "H" } ] },
					{ width: 3, subitems: [ { text: "J" } ] },
					{ width: 3, subitems: [ { text: "K" } ] },
					{ width: 3, subitems: [ { text: "L" } ] },
					{ width: 3, subitems: [ { text: "; :" } ] },
					{ width: 3, subitems: [ { text: "' \"" } ] },
					{ width: 7, subitems: [ { text: "Ent" } ] },
					{ width: 3, subitems: [ { text: "PgDn" } ] }
				]
			},
			{
				height: 3,
				buttons: [
					{ width: 6, subitems: [ { text: "ShL" } ] },
					{ width: 3, subitems: [ { text: "Z" } ] },
					{ width: 3, subitems: [ { text: "X" } ] },
					{ width: 3, subitems: [ { text: "C" } ] },
					{ width: 3, subitems: [ { text: "V" } ] },
					{ width: 3, subitems: [ { text: "B" } ] },
					{ width: 3, subitems: [ { text: "N" } ] },
					{ width: 3, subitems: [ { text: "M" } ] },
					{ width: 3, subitems: [ { text: ", <" } ] },
					{ width: 3, subitems: [ { text: ". >" } ] },
					{ width: 3, subitems: [ { text: "/ ?" } ] },
					{ width: 9, subitems: [ { text: "ShR" } ] },
					{ width: 3, subitems: [ { text: "End" } ] }
				]
			},
			{
				height: 4,
				buttons: [
					{ width: 4, subitems: [ { text: "CtrlL" } ] },
					{ width: 4, subitems: [ { text: "WinL" } ] },
					{ width: 4, subitems: [ { text: "AltL" } ] },
					{ width: 16, subitems: [ { text: "Space" } ] },
					{ width: 4, subitems: [ { text: "AltR" } ] },
					{ width: 4, subitems: [ { text: "WinR" } ] },
					{ width: 3, subitems: [ { text: "CtrlR" } ] },
					{ width: 3, subitems: [ { text: "<-" } ] },
					{ width: 3, subitems: [ { text: "Up" }, { text: "Down" } ] },
					{ width: 3, subitems: [ { text: "->" } ] }
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
				bn.addEventListener('click', fGenerateKeyEvent, false);

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
