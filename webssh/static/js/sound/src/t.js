'use strict';

function Sound(p_socket, p_hostname, p_username, p_flags) {
	this._socket = p_socket;
	this._hostname = p_hostname;
	this._username = p_username;
	this._flags = p_flags; // {playback: true|false, capture: true|false}

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
	navigator.getUserMedia({audio:true}, this.startStream.bind(this), function(e) {
		alert('no audio stream...');
	});

	// boris here
	//var self = this;
	//window.addeventListener('load', function(){self.onLoad()});
}
/*Sound.prototype.onLoad = function(){
	navigator.getUserMedia({audio:true}, this.startStream.bind(this), function(e) {
		alert('No audio stream!');
		console.log(e);
	});        
}*/
Sound.prototype.startStream = function(stream){
	alert('boris 1');
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

	//Set the stream to RecorderJs from Matt Diamond
	alert('1');
	this.Recorder           = new Recorder( virtualInput );
	alert('2');

	//Set volume to zero
	var amplificationFactor = this._context.createGain();
	//amplificationFactor.gain.value     = 0.0;

	//We set volume to zero to output, so we cancel echo
	amplificationFactor.connect( this._context.destination );        
	alert('ready');
}

Sound.prototype.stopAll = function(){
}

Sound.prototype.init = function(){ // start data streaming
	this.startStream();
}
