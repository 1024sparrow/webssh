'use strict';

function Sound(p_socket, p_hostname, p_username, p_flags) {
	//this._term = p_terminal;
	this._socket = p_socket;
	this._hostname = p_hostname;
	this._username = p_username;
	this._flags = p_flags; // {playback: true|false, capture: true|false}
	this._recordBufferSize = 4096;
	/* States: // boris here 10122.1: расписать диаграмму состояний (и поведение сервера тоже определить). Здесь мы должны определить поведение в случах разрыва связи и задержек сети. Надо избежать возможности обработки слишком поздно пришедшего ответа.
	0 - initial (silent)
	1 - decoding (playing)
	2 - playing
	*/
	this._playing = false;
	this._preloaded = undefined;
	var tmp = window.AudioContext || window.webkitAudioContext;
	this._audioContext = new tmp();


	//this._nodeRecorder;

	/*if (!navigator.getUserMedia) { // boris stub: чтоб страница не тупила
		navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	}
	try{
		this._context = new (window.AudioContext||window.webkitAudioContext)();
		console.log('Audio context set up.');
		console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
	}
	catch(e){
		alert('Your browser no supports audio');
	}*/
	
	//this._socket.addEventListener('message', function(){console.log('01127.2');}); // boris debug
	this._socket.addEventListener( // boris here 10119
		'message',
		(
			function(p_this){
				return function(p_message){
					p_this._onPlaybackDataTaken(p_message.data);
				};
			}
		)(this)
	);

	console.log('10109.1152');


	//setInterval(this._onTimer);
}
/*Sound.prototype.onLoad = function(){
	navigator.getUserMedia({audio:true}, this.startStream.bind(this), function(e) {
		alert('No audio stream!');
		console.log(e);
	});        
}*/
Sound.prototype.startStream = function(stream){
	return;// boris stub: чтоб страница не тупила

	//var microphone = this._context.createMediaStreamSource(stream);

	//Create virtual input from empty amplification factor object
	var virtualInput        = this._context.createGain();

	//Assign stream source to html5 audio context object
	var microphone         = this._context.createMediaStreamSource(stream);

	//Connect media source output to virtualInput input
	//So, virtualInput now equals microphone input
	microphone.connect(virtualInput);

	//Set audio quality and assign it to virtualInput
	var analyserNode        = this._context.createAnalyser();
	analyserNode.fftSize    = 2048; // this.fftSize;
	virtualInput.connect( analyserNode );

	var nodeRecorder = virtualInput.context.createScriptProcessor || virtualInput.context.createJavaScriptNode;
	nodeRecorder = nodeRecorder.call(virtualInput.context, this._recordBufferSize, 2, 2);
	nodeRecorder.onaudioprocess = (function(self){
		return function(e){
			self._takeChunkRecord(
				e.inputBuffer.getChannelData(0),
				e.inputBuffer.getChannelData(1)
			);
		};
	})(this);
	nodeRecorder.connect(virtualInput.context.destination);
	this._nodeRecorder = nodeRecorder;

	//Set volume to zero
	var amplificationFactor = this._context.createGain();
	//amplificationFactor.gain.value = 1.0;
	//amplificationFactor.gain.value     = 0.0;

	//We set volume to zero to output, so we cancel echo
	amplificationFactor.connect( this._context.destination );        
	console.log('ready');
}

Sound.prototype._onPlaybackDataTaken = function(p){ // boris here 10122
	//console.log('10119.0507:', p.constructor, p);
	var self = this;

	if (p.size === 0){
		this._preloaded = undefined;
		this._socket.send('1');
		return;
	}

	var fileReader = new FileReader();
	fileReader.onload = function(){
		/*const audioBuffer = audioContext.decodeAudioData(this.result, function(p_audioBuffer){
			// create audio source
			const source = audioContext.createBufferSource();
			source.buffer = p_audioBuffer;
			source.connect(audioContext.destination);

			// play audio
			source.start();
		});*/

		self._audioContext.decodeAudioData(this.result, function(p_audioBuffer){self._onPlaybackDataDecoded(p_audioBuffer)});
	};
	fileReader.readAsArrayBuffer(p);
};

Sound.prototype._onPlaybackDataDecoded = function(p){

	this._preloaded = p;

	if (!this._playing)
	{
		this._playNextChunk();
	}

	// boris here 10122.2: audioContext is still in local function inside _onPlaybackDataTaken (oops...)

	// create audio source
	/*const source = audioContext.createBufferSource();
	source.buffer = p_audioBuffer;
	source.connect(audioContext.destination);

	// play audio
	source.start();*/
};

Sound.prototype._playNextChunk = function(){
	if (!this._preloaded){
		this._playing = false;
		return;
	}
	this._playing = true;
	this._socket.send('1');
	const source = this._audioContext.createBufferSource();
	source.buffer = this._preloaded;
	this._preloaded = undefined;
	source.connect(this._audioContext.destination);
	source.onended = (function(p_this){return function(){console.log('chunk playback finished');p_this._playNextChunk();};})(this);

	// play audio
	source.start();
	console.log('chunk playback started');
};





Sound.prototype._takeChunkRecord = function(p_chan_1, p_chan_2){
	//console.log(p_chan_1); // исправно получаю
	var buffer1 = [], buffer2 = [];
	var i;
	for (i = 0 ; i < this._recordBufferSize ; ++i)
	{
		buffer1.push(p_chan_1[i]);
		buffer2.push(p_chan_2[i]);
	}
	this._socket.send(
		JSON.stringify(
			{
				sound: {
					chan1: buffer1,
					chan2: buffer2
				}
			}
		)
	);
}

Sound.prototype.stopAll = function(){
}

Sound.prototype.init = function(){ // start data streaming
	/*navigator.getUserMedia({audio:true}, this.startStream.bind(this), function(e) { // boris stub: чтоб страница не тупила
		alert('no audio stream...');
	});*/
	this._socket.send('1');
}

// boris here 2
/*Sound.prototype.processDataFromServer = function(object){
	var data, requested;
	if (this._flags.playback){
		// read and apply object.data, write requested
	}
	if (this._flags.capture){
		// read object.requested and write to data
		// boris here
		this.Recorder // boris.exportWAV(function(blob){console.log(blob);})
	}
	if (data || requested){
		this._socket.send(JSON.stringify({requested: requested, data: data}));
	}
}*/

Sound.prototype.extract_audio_data = function(p_data){
	//this._term.write('echo ' + (typeof p_data) + '\r\n');
	//this._term.write('echo ' + JSON.stringify(p_data) + '\r\n'); // boris debug
	var i, ch, state = 0;
	if (p_data.indexOf('1 2 3 4') >= 0){
		console.log(p_data);
		for (i = 0 ; i < p_data.length ; ++i){
			ch = p_data.charCodeAt(i);
			console.log(ch);
		}
	}
	return p_data;
}

Sound.prototype.data_to_write = function(){ // boris here: not using
	return "boris[1,2,3]"; // boris debug
}
