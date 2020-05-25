'use strict';

function generate_keyboard(p_eContainer){
	function generateKeyEvent(){
		/*var keyboardEvent = document.createEvent("KeyboardEvent");
		var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

		// 81 - key 'Q'
		keyboardEvent[initMethod](
			"keydown", // event type: keydown, keyup, keypress
			true,      // bubbles
			true,      // cancelable
			window,    // view: should be window
			false,     // ctrlKey
			false,     // altKey
			false,     // shiftKey
			false,     // metaKey
			81,        // keyCode: unsigned long - the virtual key code, else 0
			0          // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
		);
		document.dispatchEvent(keyboardEvent);*/
		//term.write(81);
		wssh.send('q');
		//term_write('q');
		console.log('--2--');

	}; // function generateKeyEvent

	var bn = document.createElement('div');
	bn.style.position = 'absolute';
	bn.style.color = 'green';
	bn.style.top = '50px';
	bn.style.left = '50px';
	bn.style.width = '250px';
	bn.style.height = '250px';
	bn.innerHTML = 'QQ';

	p_eContainer.appendChild(bn);
    bn.addEventListener('click', function($self){return function(){
        //$self.$_onClicked();
		console.log('--1--');
		generateKeyEvent();
    };}(this));

}; // function generate_keyboard

