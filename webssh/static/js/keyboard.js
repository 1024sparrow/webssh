'use strict';

function generate_keyboard(p_eContainer){
	function generateKeyEvent(p_event){
		wssh.send(JSON.stringify({data: 'q'}));
		console.log('xx ' + p_event.target.innerHTML);

	}; // function generateKeyEvent

	var layout = {
		width: 48,
		height: 18,
		rows: [ // rows
			{
				size: 2,
				buttons: [
					// button: if id not set, use "text" field value instead
					{ size: 3, subitems: [ { text: "Esc" } ] },
					{ size: 3, subitems: [ { text: "F1" } ] },
					{ size: 3, subitems: [ { text: "F2" } ] },
					{ size: 3, subitems: [ { text: "F3" } ] },
					{ size: 3, subitems: [ { text: "F4" } ] },
					{ size: 3, subitems: [ { text: "F5" } ] },
					{ size: 3, subitems: [ { text: "F6" } ] },
					{ size: 3, subitems: [ { text: "F7" } ] },
					{ size: 3, subitems: [ { text: "F8" } ] },
					{ size: 3, subitems: [ { text: "F9" } ] },
					{ size: 3, subitems: [ { text: "F10" } ] },
					{ size: 3, subitems: [ { text: "F12" } ] },
					{ size: 3, subitems: [ { text: "F13" } ] },
					{ size: 3, subitems: [ { text: "PrtSc" } ] },
					{ size: 3, subitems: [ { text: "Ins" } ] },
					{ size: 3, subitems: [ { text: "Del" } ] }
				]
			},
			{
				size: 3,
				buttons: [
					{ size: 3, subitems: [ { id: "`", text: "` ~" } ] },
					{ size: 3, subitems: [ { id: "1", text: "1 !" } ] },
					{ size: 3, subitems: [ { id: "2", text: "2 @" } ] },
					{ size: 3, subitems: [ { id: "3", text: "3 #" } ] },
					{ size: 3, subitems: [ { id: "4", text: "4 $" } ] },
					{ size: 3, subitems: [ { id: "5", text: "5 %" } ] },
					{ size: 3, subitems: [ { id: "6", text: "6 ^" } ] },
					{ size: 3, subitems: [ { id: "7", text: "7 &" } ] },
					{ size: 3, subitems: [ { id: "8", text: "8 *" } ] },
					{ size: 3, subitems: [ { id: "9", text: "9 (" } ] },
					{ size: 3, subitems: [ { id: "0", text: "0 )" } ] },
					{ size: 3, subitems: [ { id: "-", text: "- _" } ] },
					{ size: 3, subitems: [ { id: "=", text: "= +" } ] },
					{ size: 3, subitems: [ { id: "BS", text: "BS" } ] },
					{ size: 3, subitems: [ { id: "Home", text: "Home" } ] }
				]
			},
			{
				size: 3,
				buttons: [
					{ size: 4, subitems: [ { text: "Tab" } ] },
					{ size: 3, subitems: [ { text: "Q" } ] },
					{ size: 3, subitems: [ { text: "W" } ] },
					{ size: 3, subitems: [ { text: "E" } ] },
					{ size: 3, subitems: [ { text: "R" } ] },
					{ size: 3, subitems: [ { text: "T" } ] },
					{ size: 3, subitems: [ { text: "Y" } ] },
					{ size: 3, subitems: [ { text: "U" } ] },
					{ size: 3, subitems: [ { text: "I" } ] },
					{ size: 3, subitems: [ { text: "O" } ] },
					{ size: 3, subitems: [ { text: "P" } ] },
					{ size: 3, subitems: [ { text: "[ {" } ] },
					{ size: 3, subitems: [ { text: "] }" } ] },
					{ size: 5, subitems: [ { text: "\\ |" } ] },
					{ size: 3, subitems: [ { text: "PgUp" } ] }
				]
			},
			{
				size: 3,
				buttons: [
					{ size: 5, subitems: [ { text: "Caps" } ] },
					{ size: 3, subitems: [ { text: "A" } ] },
					{ size: 3, subitems: [ { text: "S" } ] },
					{ size: 3, subitems: [ { text: "D" } ] },
					{ size: 3, subitems: [ { text: "F" } ] },
					{ size: 3, subitems: [ { text: "G" } ] },
					{ size: 3, subitems: [ { text: "H" } ] },
					{ size: 3, subitems: [ { text: "J" } ] },
					{ size: 3, subitems: [ { text: "K" } ] },
					{ size: 3, subitems: [ { text: "L" } ] },
					{ size: 3, subitems: [ { text: "; :" } ] },
					{ size: 3, subitems: [ { text: "' \"" } ] },
					{ size: 7, subitems: [ { text: "Ent" } ] },
					{ size: 3, subitems: [ { text: "PgDn" } ] }
				]
			},
			{
				size: 3,
				buttons: [
					{ size: 6, subitems: [ { text: "Sh" } ] },
					{ size: 3, subitems: [ { text: "Z" } ] },
					{ size: 3, subitems: [ { text: "X" } ] },
					{ size: 3, subitems: [ { text: "C" } ] },
					{ size: 3, subitems: [ { text: "V" } ] },
					{ size: 3, subitems: [ { text: "B" } ] },
					{ size: 3, subitems: [ { text: "N" } ] },
					{ size: 3, subitems: [ { text: "M" } ] },
					{ size: 3, subitems: [ { text: ", <" } ] },
					{ size: 3, subitems: [ { text: ". >" } ] },
					{ size: 3, subitems: [ { text: "/ ?" } ] },
					{ size: 9, subitems: [ { text: "Sh" } ] },
					{ size: 3, subitems: [ { text: "End" } ] }
				]
			},
			{
				size: 4,
				buttons: [
					{ size: 4, subitems: [ { text: "CtrlL" } ] },
					{ size: 4, subitems: [ { text: "WinL" } ] },
					{ size: 3, subitems: [ { text: "AltL" } ] },
					{ size: 3, subitems: [ { text: "Space" } ] },
					{ size: 3, subitems: [ { text: "AltR" } ] },
					{ size: 3, subitems: [ { text: "WinR" } ] },
					{ size: 3, subitems: [ { text: "CtrlR" } ] },
					{ size: 3, subitems: [ { text: "<-" } ] },
					{ size: 3, subitems: [ { text: "Up" }, { text: "Down" } ] },
					{ size: 3, subitems: [ { text: "->" } ] }
				]
			}
		] // rows
	};

	var bn = document.createElement('div');
	bn.style.position = 'absolute';
	bn.style.color = 'green';
	bn.style.top = '50px';
	bn.style.left = '50px';
	bn.style.width = '250px';
	bn.style.height = '250px';
	bn.innerHTML = 'QQ';

	p_eContainer.appendChild(bn);
    bn.addEventListener('click', generateKeyEvent);
    /*bn.addEventListener('click', function($self){return function(){
        //$self.$_onClicked();
		generateKeyEvent();
    };}(this));*/

}; // function generate_keyboard

