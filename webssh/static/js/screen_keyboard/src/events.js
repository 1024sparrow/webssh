(function(self){
	//tmp.addEventListener('click', function(e){console.log('clicked');e.preventDefault();});
	var
		prevX,
		prevY,
		prevOpacity = 0.3,
		curScrollPos = 0,
		prevScrollPos = 0,
		bn
	;
	//var isMoved;

	self._terminal.onScroll(function(p_pos){curScrollPos = p_pos;});

	function processDraging(dx, dy){
		var
			//dx = touches[0].pageX - prevX,
			//dy = touches[0].pageY - prevY,
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
	/*function processClick(touches){
		var
			x = touches[0].pageX,
			y = touches[0].pageY,
			tmp
		;
		//consol.log(`x: ${x}, y: ${y}`);
		self._generateKeyEvent(x, y);
	}*/
	/* States:
		0 - normal
		1 - pressed
		2 - released (process click)
		3 - pressed second key (we\ll don't wait release event - we already have two keys)
		4 - moving
		5 - released (process dragging)
	*/
	var state = 0;
	function processEvent(e, p){ // e: 100 - pressed, 200 - moved, 300 - released, 400 - timerTick (reserved)
		var
			x,
			y,
			bn,
			modifier,
			bnPrev
		;
		if (state !== 400){
			x = p[0].pageX;
			y = p[0].pageY;
		}

		if (state === 0){
			if (e === 100){
				prevX = x;
				prevY = y;
				prevScrollPos = curScrollPos;
				prevOpacity = self.opacity();
				state = 1;
			}
			else if (e === 200){ // ignore
			}
			else if (e === 300){ // ignore
			}
			else if (e == 400){
				// thinning and press-repeating here
			}
		}
		else if (state === 1){
			if (e === 100){ // two keys: only MODIFIER + ORDINARY_KEY
				bnPrev = self._hitButton(prevX, prevY);
				if (!bnPrev){
					if (bn = self._hitButton(x,y)){
						modifier = bn.modifier;
					}
					if (bn && !modifier){
						state = 2;
					}
					else{
						state = 0;
					}
				}
				else{
					modifier = bnPrev.modifier;
					if (bn = self._hitButton(x,y)){
						if (modifier){
							if (!bn.modifier){
								state = 3;
							}
							else{
								state = 0;
							}
						}
						else{
							if (bn.modifier){
								modifier = bn.modifier;
								bn = bnPrev;
								state = 3;
							}
							else{
								state = 0; // or process two keys... if you want to get a typo
							}
						}
					}
					else{
						if (!modifier){
							state = 2;
						}
						else{
							state = 0;
						}
					}
				}
			}
			else if (e === 200){
				state = 4;
			}
			else if (e === 300){
				if (bn = self._hitButton(x,y)){
					modifier = bn.modifier;
				}
				if (bn && !modifier){
					state = 2;
				}
				else{
					state = 0;
				}
			}
			else if (e === 400){
			}
		}
		/*else if (state === 2){
			if (e === 100){
			}
			else if (e === 200){
			}
			else if (e === 300){
			}
			else if (e === 400){
			}
		}
		else if (state === 3){
			if (e === 100){
			}
			else if (e === 200){
			}
			else if (e === 300){
			}
			else if (e === 400){
			}
		}*/
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
		/*else if (state === 5){
			if (e === 100){
			}
			else if (e === 200){
			}
			else if (e === 300){
			}
			else if (e === 400){
			}
		}*/

		//consol.log(state);
		if ((state === 2) || (state === 3)){
			//consol.log(JSON.stringify(bn.keyCode));
			self._generateKeyEvent(bn, modifier);
			state = 0;
		}
		else if ((state === 4) || (state === 5)){
			processDraging(x - prevX, y - prevY);
			state = 0;
		}
	}

	var consol = {};
	consol.log = function(p){
		console.log(p);
		self._terminal.write(p + '\t');
	};

	tmp.addEventListener('touchstart', function(e){
		/*consol.log('touchstart(1):' + JSON.stringify(e.changedTouches));//
		consol.log('touchstart(2):' + JSON.stringify(e.changedTouches[0].pageX));//
		consol.log('touchstart(3):' + JSON.stringify(e.changedTouches[1].pageX));//
		prevX = e.changedTouches[0].pageX;
		prevY = e.changedTouches[0].pageY;
		prevScrollPos = curScrollPos;
		prevOpacity = self.opacity();
		isMoved = false;*/
		processEvent(100, e.changedTouches);
		e.preventDefault();
		return false;
	});
	tmp.addEventListener('touchend', function(e){
		/*consol.log('touchend' + JSON.stringify(e.changedTouches));//
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
		}*/
		processEvent(300, e.changedTouches);
		e.preventDefault();
		return false;
	});
	tmp.addEventListener('touchmove', function(e){
		/*var
			dx = e.changedTouches[0].pageX - prevX,
			dy = e.changedTouches[0].pageY - prevY
		;
		consol.log('mouse moved' + JSON.stringify(e.changedTouches));//
		//var
		//	x = e.changedTouches[0].pageX,
		//	y = e.changedTouches[0].pageY
		//;
		processDraging(e.changedTouches);
		isMoved = true;*/
		processEvent(200, e.changedTouches);
		e.preventDefault();
		return false;
	});
})(this);
