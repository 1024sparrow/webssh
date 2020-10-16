		sock.onopen = function() {
			term.open(terminal);
		if (sound){ // boris commented
			sound.init();
		}
			if (skb){
				skb.setVisible(true);
			}
			toggle_fullscreen(term);
			update_font_family(term);
			term.focus();
			term.blur();
			state = CONNECTED;
			title_element.text = url_opts_data.title || default_title;
			if (url_opts_data.command) {
				setTimeout(function () {
					sock.send(JSON.stringify({'data': url_opts_data.command+'\r'}));
				}, 500);
			}
		};

		sock.onmessage = function(msg) { // boris here 1
			read_file_as_text(msg.data, term_write, decoder);
		};

		sock.onerror = function(e) {
			console.error(e);
		};

		sock.onclose = function(e) {
			term.dispose();
			term = undefined;
		/*if (sound){
		sound.stopAll();
		}*/
			if (skb){
				skb.setVisible(false);
			}
			sock = undefined;
			reset_wssh();
			log_status(e.reason, true);
			state = DISCONNECTED;
			default_title = 'WebSSH';
			title_element.text = default_title;
		};
