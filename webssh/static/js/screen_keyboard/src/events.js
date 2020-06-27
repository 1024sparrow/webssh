(function(self){
	//tmp.addEventListener('click', function(e){console.log('clicked');e.preventDefault();});
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
		6 - released key while another keeping pressed (modifier)
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
					//self._terminal.write(`%%${bn.modifier}`);
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
				if (bn = self._hitButton(x,y)){
					if (!bn.modifier){
						self._generateKeyEvent(bn, modifier);
						repeatCounter = 0;
					}
				}
			}
			else if (e === 200){
				state = 4;
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
		/*else if (state === 6){
			if (e === 100){
			}
			else if (e === 200){
				if (modifier){
					self._currentModifier = undefined;
					modifier = undefined;
					self._updateKeyImages();
				}
				state = 0;
			}
			else if (e === 300){
				if (bn = self._hitButton(x,y)){
					self._terminal.write('#'+bn.modifier+'#');//
					if (bn.modifier){
						modifier = undefined;
						self._currentModifier = undefined;
						self._updateKeyImages();
						state = 0;
					}
				}
				else{
					state = 0; // oops...
				}
			}
			else if (e === 400){
			}
		}*/

		//consol.log(state);
		if ((state === 4) || (state === 5)){
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
		processEvent(100, e.changedTouches);
		e.preventDefault();
		return false;
	});
	tmp.addEventListener('touchend', function(e){
		processEvent(300, e.changedTouches);
		e.preventDefault();
		return false;
	});
	/*tmp.addEventListener('touchmove', function(e){
		processEvent(200, e.changedTouches);
		e.preventDefault();
		return false;
	});*/
	setInterval(function(){processEvent(400);}, REPEAT_INTERVAL);
})(this);
