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
				tmp = self._hitButton(prevX, prevY);

				if (tmp !== self._hitButton(x, y)){
					bn = tmp;
					repeatCounter = -1;
					state = 4;
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
