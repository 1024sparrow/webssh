'use strict';

/*
Class ScreenKeyboard.
set Visible by method setVisible(boolean p_on). Invisible by default.
*/
function ScreenKeyboard(){
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
					{ width: 6, subitems: [ { text: "Sh" } ] },
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
					{ width: 9, subitems: [ { text: "Sh" } ] },
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
	var fGenerateKeyEvent = function(p_event){
		wssh.send(JSON.stringify({data: 'q'}));
		console.log('xx ' + p_event.target.innerHTML);

	}; // function fGenerateKeyEvent
	var tmp = document.createElement('div');
	this._eContainer = tmp;
	tmp = tmp.style;
	//this._eContainer.style.display = 'none';
	tmp.border = '8px solid green';
	document.body.appendChild(this._eContainer);

	this._buttons = {};

	/*
	var bn;
	//const CONST_W = 800; // 
	//const CONST_H = 600; // 
	const heightKoef = window.innerWidth / layout.height;
	const widthKoef = window.innerHeight / layout.width;
	var xCell, yRow = 0, yCell, wCell, hRow, hCell;
	for (const oRow of layout.rows){
		xCell = 0;
		hRow = heightKoef * oRow.height;
		for (const oButton of oRow.buttons){
			wCell = widthKoef * oButton.width;

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

				bn.style.top = '' + yCell + 'px';
				bn.style.left = '' + xCell + 'px';
				bn.style.width = '' + wCell + 'px';
				bn.style.height = '' + hCell + 'px';

				p_eContainer.appendChild(bn);
				bn.addEventListener('click', fGenerateKeyEvent);

				//this._buttons[oSubitem.text] = bn;
				this._buttons[oSubitem.text] = {
					e: bn,
					geometry: {
					}
				};

				yCell += hCell;
			}
			xCell += wCell;
		}
		yRow += hRow;
	}
	*/

	(function(self){
		var f = function(){
			var
				w = window.innerWidth,
				h = window.innerHeight
			;
			self._onResized($,h);
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
	this._eContainer.style.display = p_on ? 'block' : 'none';
	this._isVisible = p_on;
};
ScreenKeyboard.prototype._onResized = function(){
	console.log('screen keyboard resized');
};

/*function generate_keyboard(p_eContainer){
	function generateKeyEvent(p_event){
		wssh.send(JSON.stringify({data: 'q'}));
		console.log('xx ' + p_event.target.innerHTML);

	}; // function generateKeyEvent

	var layout = {};

    //bn.addEventListener('click', function($self){return function(){
    //    //$self.$_onClicked();
	//	generateKeyEvent();
    //};}(this));

	var bn;
	//const CONST_W = 800; // 
	//const CONST_H = 600; // 
	const heightKoef = window.innerWidth / layout.height;
	const widthKoef = window.innerHeight / layout.width;
	var xCell, yRow = 0, yCell, wCell, hRow, hCell;
	for (const oRow of layout.rows){
		xCell = 0;
		hRow = heightKoef * oRow.height;
		for (const oButton of oRow.buttons){
			wCell = widthKoef * oButton.width;

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

				bn.style.top = '' + yCell + 'px';
				bn.style.left = '' + xCell + 'px';
				bn.style.width = '' + wCell + 'px';
				bn.style.height = '' + hCell + 'px';

				p_eContainer.appendChild(bn);
				bn.addEventListener('click', generateKeyEvent);

				yCell += hCell;
			}
			xCell += wCell;
		}
		yRow += hRow;
	}

}; // function generate_keyboard
*/
