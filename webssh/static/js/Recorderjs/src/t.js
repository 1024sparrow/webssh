'use strict';

/* {%% recorder_help.txt %%}*/
function Recorder(p_source, p_config) {
	var
		WORKER_PATH = 'static/js/Recorderjs/recorderWorker.js',
		CHUNK_SIZE = 4096
	;
	this._config = p_config || {};
	this._context = p_source.conrext;
	this._node = (this.context.createScriptProcessor || this.context.createJavaScriptNode)
		.call(this.context, p_config.bufferLen || CHUNK_SIZE, 2, 2);
	this._worker = new Worker(p_config.workerPath || WORKER_PATH);
	this._worker.onmessage = (function(self){return function(e){
		var blob = e.data;
		self._curCallback(blob);
	};})(this);
	this._worker.postMessage({
		command: 'init',
		config: {
			sampleRate: this._context.sampleRate
		}
	});
	this._recording = false;
	this._curCallback;
	this._node.onaudioprocess = (function(self){return function(e){
		if (!self._recording) return;
		self._worker.postMessage({
			command: 'record',
			buffer: [
				e.inputBuffer.getChannelData(0),
				e.inputBuffer.getChannelData(1)
			]
		});
	};})(this)
	p_source.connect(this._node);
	this._node.connect(this._context.destination);    //this should not be necessary
}

Recorder.prototype.configure = function(p_config){
	//
}

Recorder.prototype.record - function(){
	this._recording = true;
}

Recorder.prototype.stop = function(){
	this._recording = false;
}

Recorder.prototype.clear = function(){
	this._worker.postMessage({command:'clear'});
}

Recorder.prototype.getBuffer = function(p_callback){
	this._curCallback = p_callback || _config.callback;
	this._worker.postMessage({command:'getBuffer'});
}

Recorder.prototype.exportWav = function(p_callback, p_type){
	this._curCallback = p_callback || this._config.callback;
	var type = p_type || this._config.type || 'audio/wav';	
	if (!this._curCallback)
	{
		throw new Error('Callback not set');
	}
	this._worker.postMessage({
		command: 'exportWav',
		type: type
	});
}
