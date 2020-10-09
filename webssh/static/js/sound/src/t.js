'use strict';

function Sound(p_terminal, p_socket, p_hostname, p_username, p_flags) {
	this._term = p_terminal;
	this._socket = p_socket;
	this._hostname = p_hostname;
	this._username = p_username;
	this._flags = p_flags; // {playback: true|false, capture: true|false}
	this._recordBufferSize = 4096;
	//this._nodeRecorder;

	if (!navigator.getUserMedia) {
		navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	}
	try{
		this._context = new (window.AudioContext||window.webkitAudioContext)();
		console.log('Audio context set up.');
		console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
	}
	catch(e){
		alert('Your browser no supports audio');
	}
	//setInterval(this._onTimer);
}
/*Sound.prototype.onLoad = function(){
	navigator.getUserMedia({audio:true}, this.startStream.bind(this), function(e) {
		alert('No audio stream!');
		console.log(e);
	});        
}*/
Sound.prototype.startStream = function(stream){
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

Sound.prototype._takeChunkRecord = function(p_chan_1, p_chan_2){
	//console.log(p_chan_1);
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
	navigator.getUserMedia({audio:true}, this.startStream.bind(this), function(e) {
		alert('no audio stream...');
	});
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
	return p_data;
}

Sound.prototype.data_to_write = function(){ // boris here: not using
	return "boris[1,2,3]"; // boris debug
}
