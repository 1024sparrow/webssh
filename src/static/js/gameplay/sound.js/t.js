'use strict';

function Sound(p_socket, p_hostname, p_username, p_flags) {
	//this._term = p_terminal;
	this._socket = p_socket;
	this._hostname = p_hostname;
	this._username = p_username;
	this._flags = p_flags; // {playback: true|false, capture: true|false}
	this._recordBufferSize = 4096;
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

Sound.prototype._onPlaybackDataTaken = function(p){
	console.log('10119.0507:', p.constructor);
	var tmp = window.AudioContext || window.webkitAudioContext;
	var audioContext = new tmp();

	// p must be an ArrayBuffer
	const audioBuffer = audioContext.decodeAudioData(p.arrayBuffer(), function(){ // boris here 10120: incorrect Blob to ArrayBuffer conversion: see https://riptutorial.com/javascript/example/1390/converting-between-blobs-and-arraybuffers
		// create audio source
		const source = audioContext.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(audioContext.destination);

		// play audio
		source.start();
	});
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
	this._socket.send('1'); // boris here 10119: почему "_socket is undefined" ?
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
