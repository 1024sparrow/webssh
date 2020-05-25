'use strict';

function generate_keyboard(p_eContainer){
	function generateKeyEvent(p_event){
		wssh.send(JSON.stringify({data: 'q'}));
		console.log('xx ' + p_event.target.innerHTML);

	}; // function generateKeyEvent

	var layout = {
		width: 48,
		height: 18,
		buttons: [ // rows
			{2, {
				{3,{{"KEY_A", "Esc"}}},
				{3,{{"KEY_A", "F1"}}},
				{3,{{"KEY_A", "F2"}}},
				{3,{{"KEY_A", "F3"}}},
				{3,{{"KEY_A", "F4"}}},
				{3,{{"KEY_A", "F5"}}},
				{3,{{"KEY_A", "F6"}}},
				{3,{{"KEY_A", "F7"}}},
				{3,{{"KEY_A", "F8"}}},
				{3,{{"KEY_A", "F9"}}},
				{3,{{"KEY_A", "F10"}}},
				{3,{{"KEY_A", "F11"}}},
				{3,{{"KEY_A", "F12"}}},
				{3,{{"KEY_A", "PrtSc"}}},
				//{2,{{"KEY_A", "Pause"}}},
				{3,{{"KEY_A", "Ins"}}},
				{3,{{"KEY_A", "Del"}}}
			}}, // 00
			{3, {
				{3,{{"KEY_A", "` ~"}}},
				{3,{{"KEY_A","1 !"}}},
				{3,{{"KEY_A", "2 @"}}},
				{3,{{"KEY_A", "3 #"}}},
				{3,{{"KEY_A", "4 $"}}},
				{3,{{"KEY_A", "5 %"}}},
				{3,{{"KEY_A", "6 ^"}}},
				{3,{{"KEY_A", "7 &"}}},
				{3,{{"KEY_A", "8 *"}}},
				{3,{{"KEY_A", "9 ("}}},
				{3,{{"KEY_A", "0 )"}}},
				{3,{{"KEY_A", "- _"}}},
				{3,{{"KEY_A", "= +"}}},
				{6,{{"KEY_A", "BS"}}},
				{3,{{"KEY_A", "Home"}}}
			}}, // 01
			{3, {
				{4,{{"KEY_A", "Tab"}}},
				{3,{{"KEY_A", "Q"}}},
				{3,{{"KEY_A", "W"}}},
				{3,{{"KEY_A", "E"}}},
				{3,{{"KEY_A", "R"}}},
				{3,{{"KEY_A", "T"}}},
				{3,{{"KEY_A", "Y"}}},
				{3,{{"KEY_A", "U"}}},
				{3,{{"KEY_A", "I"}}},
				{3,{{"KEY_A", "O"}}},
				{3,{{"KEY_A", "P"}}},
				{3,{{"KEY_A", "[ {"}}},
				{3,{{"KEY_A", "] }"}}},
				{5,{{"KEY_A", "\\\\ |"}}},
				{3,{{"KEY_A", "PgUp"}}}
			}}, // 03
			{3, {
				{5,{{"KEY_A", "Caps"}}},
				{3,{{"KEY_A", "A"}}},
				{3,{{"KEY_A", "S"}}},
				{3,{{"KEY_A", "D"}}},
				{3,{{"KEY_A", "F"}}},
				{3,{{"KEY_A", "G"}}},
				{3,{{"KEY_A", "H"}}},
				{3,{{"KEY_A", "J"}}},
				{3,{{"KEY_A", "K"}}},
				{3,{{"KEY_A", "L"}}},
				{3,{{"KEY_A", ": ;"}}},
				{3,{{"KEY_A", "' \\\""}}},
				{7,{{"KEY_A", "Ent"}}},
				{3,{{"KEY_A", "PgDn"}}}
			}}, // 05
			{3, {
				{6,{{"KEY_A", "Sh"}}},
				{3,{{"KEY_A", "Z"}}},
				{3,{{"KEY_A", "X"}}},
				{3,{{"KEY_A", "C"}}},
				{3,{{"KEY_A", "V"}}},
				{3,{{"KEY_A", "B"}}},
				{3,{{"KEY_A", "N"}}},
				{3,{{"KEY_A", "M"}}},
				{3,{{"KEY_A", ", <"}}},
				{3,{{"KEY_A", ". >"}}},
				{3,{{"KEY_A", "/ ?"}}},
				{9,{{"KEY_A", "Sh"}}},
				{3,{{"KEY_A", "End"}}}
			}}, // 07
			{4, {
				{4,{{"KEY_A", "Ctrl"}}},
				{4,{{"KEY_A", "Win"}}},
				{4,{{"KEY_A", "Alt"}}},
				{16,{{"KEY_A", "Space"}}},
				{4,{{"KEY_A", "Alt"}}},
				{4,{{"KEY_A", "Win"}}},
				{3,{{"KEY_A", "Ctrl"}}},
				{3,{{"KEY_A", "<-"}}},
				{3,{{"KEY_A", "Up"},{"KEY_A", "Down"}}},
				{3,{{"KEY_A", "->"}}},
			}} // 09
		]
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

