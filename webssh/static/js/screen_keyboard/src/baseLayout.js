width: 48,
height: 18,
rows: [ // rows
	{
		height: 2,
		buttons: [
			// button: if id not set, use "text" field value instead
			{ width: 3, subitems: [ { text: "esc", keycode: { normal: [ 27 ], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f1", keycode: { normal: [ 27,79,80 ], shift: [ 27,91,49,59,50,80 ], alt: [ 27,91,49,59,51,80 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f2", keycode: { normal: [ 27,79,81 ], shift: [ 27,91,49,59,50,81 ], alt: [ 27,91,49,59,51,81 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f3", keycode: { normal: [ 27,79,82 ], shift: [ 27,91,49,59,50,82 ], alt: [ 27,91,49,59,51,82 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f4", keycode: { normal: [ 27,79,83 ], shift: [ 27,91,49,59,50,83 ], alt: [ 27,91,49,59,51,83 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f5", keycode: { normal: [ 27,91,49,53,126 ], shift: [ 27,91,49,53,59,50,126 ], alt: [ 27,91,49,53,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f6", keycode: { normal: [ 27,91,49,55,126 ], shift: [ 27,91,49,55,59,50,126 ], alt: [ 27,91,49,55,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f7", keycode: { normal: [ 27,91,49,56,126 ], shift: [ 27,91,49,56,59,50,126 ], alt: [ 27,91,49,56,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f8", keycode: { normal: [ 27,91,49,57,126 ], shift: [ 27,91,49,57,59,50,126 ], alt: [ 27,91,49,57,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f9", keycode: { normal: [ 27,91,50,48,126 ], shift: [ 27,91,50,48,59,50,126 ], alt: [ 27,91,50,48,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f10", keycode: { normal: [ 27,91,50,49,126 ], shift: [ 27,91,50,49,59,50,126 ], alt: [ 27,91,50,49,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f11", keycode: { normal: [ 27,91,50,51,126 ], shift: [ 27,91,50,51,59,50,126 ], alt: [ 27,91,50,51,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "f12", keycode: { normal: [ 27,91,50,52,126 ], shift: [ 27,91,50,52,59,50,126 ], alt: [ 27,91,50,52,59,51,126 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "scrolllock", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "insert", keycode: { normal: [ 27,91,50,126 ], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "delete", keycode: { normal: [ 27,91,51,126 ], shift: [], alt: [], ctrl: [ 27,91,51,59,53,126 ] } } ] }
		]
	},
	{
		height: 3,
		buttons: [
			{ width: 3, subitems: [ { text: "backquote", keycode: { normal: [ 96 ], shift: [ 126 ], alt: [ 27,96 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "1", keycode: { normal: [ 49 ], shift: [ 33 ], alt: [ 27,49 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "2", keycode: { normal: [ 50 ], shift: [ 64 ], alt: [ 27,50 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "3", keycode: { normal: [ 51 ], shift: [ 35 ], alt: [ 27,51 ], ctrl: [ 27 ] } } ] },
			{ width: 3, subitems: [ { text: "4", keycode: { normal: [ 52 ], shift: [ 36 ], alt: [ 27,52 ], ctrl: [ 28 ] } } ] },
			{ width: 3, subitems: [ { text: "5", keycode: { normal: [ 53 ], shift: [ 37 ], alt: [ 27,53 ], ctrl: [ 29 ] } } ] },
			{ width: 3, subitems: [ { text: "6", keycode: { normal: [ 54 ], shift: [ 94 ], alt: [ 27,54 ], ctrl: [ 30 ] } } ] },
			{ width: 3, subitems: [ { text: "7", keycode: { normal: [ 55 ], shift: [ 38 ], alt: [ 27,55 ], ctrl: [ 31 ] } } ] },
			{ width: 3, subitems: [ { text: "8", keycode: { normal: [ 56 ], shift: [ 42 ], alt: [ 27,56 ], ctrl: [ 127 ] } } ] },
			{ width: 3, subitems: [ { text: "9", keycode: { normal: [ 57 ], shift: [ 40 ], alt: [ 27,57 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "0", keycode: { normal: [ 48 ], shift: [ 41 ], alt: [ 27,48 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "defis", keycode: { normal: [ 45 ], shift: [ 95 ], alt: [ 27,45 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "equal", keycode: { normal: [ 61 ], shift: [ 43 ], alt: [ 27,61 ], ctrl: [] } } ] },
			{ width: 6, subitems: [ { text: "BS", keycode: { normal: [ 127 ], shift: [ 8 ], alt: [ 27,127 ], ctrl: [8] } } ] },
			{ width: 3, subitems: [ { text: "home", keycode: { normal: [ 27,91,72 ], shift: [ 27,91,49,59,50,72 ], alt: [ 27,91,49,59,51,72 ], ctrl: [ 27,91,49,59,53,72 ] } } ] }
		]
	},
	{
		height: 3,
		buttons: [
			{ width: 4, subitems: [ { text: "tab", keycode: { normal: [ 9 ], shift: [ 27,91,90 ], alt: [], ctrl: [ 0 ] } } ] },
			{ width: 3, subitems: [ { text: "q", keycode: { normal: [ 113 ], shift: [ 81 ], alt: [ 27,113 ], ctrl: [ 17 ] } } ] },
			{ width: 3, subitems: [ { text: "w", keycode: { normal: [ 119 ], shift: [ 87 ], alt: [ 27,119 ], ctrl: [ 23 ] } } ] },
			{ width: 3, subitems: [ { text: "e", keycode: { normal: [ 101 ], shift: [ 69 ], alt: [ 27,101 ], ctrl: [ 5 ] } } ] },
			{ width: 3, subitems: [ { text: "r", keycode: { normal: [ 114 ], shift: [ 82 ], alt: [ 27,114 ], ctrl: [ 18 ] } } ] },
			{ width: 3, subitems: [ { text: "t", keycode: { normal: [ 116 ], shift: [ 84 ], alt: [ 27,116 ], ctrl: [ 20 ] } } ] },
			{ width: 3, subitems: [ { text: "y", keycode: { normal: [ 121 ], shift: [ 89 ], alt: [ 27,121 ], ctrl: [ 25 ] } } ] },
			{ width: 3, subitems: [ { text: "u", keycode: { normal: [ 117 ], shift: [ 85 ], alt: [ 27,117 ], ctrl: [ 21 ] } } ] },
			{ width: 3, subitems: [ { text: "i", keycode: { normal: [ 105 ], shift: [ 73 ], alt: [ 27,105 ], ctrl: [ 9 ] } } ] },
			{ width: 3, subitems: [ { text: "o", keycode: { normal: [ 111 ], shift: [ 79 ], alt: [ 27,111 ], ctrl: [ 15 ] } } ] },
			{ width: 3, subitems: [ { text: "p", keycode: { normal: [ 112 ], shift: [ 80 ], alt: [ 27,112 ], ctrl: [ 16 ] } } ] },
			{ width: 3, subitems: [ { text: "figstart", keycode: { normal: [ 91 ], shift: [ 123 ], alt: [ 27,91 ], ctrl: [ 27 ] } } ] },
			{ width: 3, subitems: [ { text: "figend", keycode: { normal: [ 93 ], shift: [ 125 ], alt: [ 27,93 ], ctrl: [ 29 ] } } ] },
			{ width: 5, subitems: [ { text: "backslash", keycode: { normal: [ 92 ], shift: [ 124 ], alt: [ 27,92 ], ctrl: [ 28 ] } } ] },
			{ width: 3, subitems: [ { text: "PgUp", keycode: { normal: [ 27,91,53,126 ], shift: [], alt: [], ctrl: [27,91,53,59,53,126] } } ] }
		]
	},
	{
		height: 3,
		buttons: [
			{ width: 5, subitems: [ { text: "capslock", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "a", keycode: { normal: [ 97 ], shift: [ 65 ], alt: [ 27,97 ], ctrl: [ 1 ] } } ] },
			{ width: 3, subitems: [ { text: "s", keycode: { normal: [ 115 ], shift: [ 83 ], alt: [ 27,115 ], ctrl: [ 19 ] } } ] },
			{ width: 3, subitems: [ { text: "d", keycode: { normal: [ 100 ], shift: [ 68 ], alt: [ 27,100 ], ctrl: [ 4 ] } } ] },
			{ width: 3, subitems: [ { text: "f", keycode: { normal: [ 102 ], shift: [ 70 ], alt: [ 27,102 ], ctrl: [ 6 ] } } ] },
			{ width: 3, subitems: [ { text: "g", keycode: { normal: [ 103 ], shift: [ 71 ], alt: [ 27,103 ], ctrl: [ 7 ] } } ] },
			{ width: 3, subitems: [ { text: "h", keycode: { normal: [ 104 ], shift: [ 72 ], alt: [ 27,104 ], ctrl: [ 8 ] } } ] },
			{ width: 3, subitems: [ { text: "j", keycode: { normal: [ 106 ], shift: [ 74 ], alt: [ 27,106 ], ctrl: [ 10 ] } } ] },
			{ width: 3, subitems: [ { text: "k", keycode: { normal: [ 107 ], shift: [ 75 ], alt: [ 27,107 ], ctrl: [ 11 ] } } ] },
			{ width: 3, subitems: [ { text: "l", keycode: { normal: [ 108 ], shift: [ 76 ], alt: [ 27,108 ], ctrl: [ 12 ] } } ] },
			{ width: 3, subitems: [ { text: "colon", shift_text: "shift_colon", keycode: { normal: [ 59 ], shift: [ 58 ], alt: [ 27,59 ], ctrl: [ 59 ] } } ] },
			{ width: 3, subitems: [ { text: "quote", shift_text: "shift_quote", keycode: { normal: [ 39 ], shift: [ 34 ], alt: [ 27,39 ], ctrl: [ 39 ] } } ] },
			{ width: 7, subitems: [ { text: "enter", keycode: { normal: [ 13 ], shift: [], alt: [], ctrl: [13] } } ] },
			{ width: 3, subitems: [ { text: "PgDn", keycode: { normal: [ 27,91,54,126 ], shift: [], alt: [], ctrl: [27,91,54,59,53,126] } } ] }
		]
	},
	{
		height: 3,
		buttons: [
			{ width: 6, subitems: [ { text: "shift_left", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "z", keycode: { normal: [ 122 ], shift: [ 90 ], alt: [ 27,122 ], ctrl: [ 26 ] } } ] },
			{ width: 3, subitems: [ { text: "x", keycode: { normal: [ 120 ], shift: [ 88 ], alt: [ 27,120 ], ctrl: [ 24 ] } } ] },
			{ width: 3, subitems: [ { text: "c", keycode: { normal: [ 99 ], shift: [ 67 ], alt: [ 27,99 ], ctrl: [ 3 ] } } ] },
			{ width: 3, subitems: [ { text: "v", keycode: { normal: [ 118 ], shift: [ 86 ], alt: [ 27,118 ], ctrl: [ 22 ] } } ] },
			{ width: 3, subitems: [ { text: "b", keycode: { normal: [ 98 ], shift: [ 66 ], alt: [ 27,98 ], ctrl: [ 2 ] } } ] },
			{ width: 3, subitems: [ { text: "n", keycode: { normal: [ 110 ], shift: [ 78 ], alt: [ 27,110 ], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "m", keycode: { normal: [ 109 ], shift: [ 77 ], alt: [ 27,109 ], ctrl: [ 13 ] } } ] },
			{ width: 3, subitems: [ { text: "comma", keycode: { normal: [ 44 ], shift: [ 60 ], alt: [ 27,44 ], ctrl: [ 44 ] } } ] },
			{ width: 3, subitems: [ { text: "dot", keycode: { normal: [ 46 ], shift: [ 62 ], alt: [ 27,46 ], ctrl: [ 46 ] } } ] },
			{ width: 3, subitems: [ { text: "slash", keycode: { normal: [ 47 ], shift: [ 63 ], alt: [ 27,47 ], ctrl: [ 31 ] } } ] },
			{ width: 9, subitems: [ { text: "shift_right", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "end", keycode: { normal: [ 27,91,70 ], shift: [ 27,91,49,59,50,70 ], alt: [ 27,91,49,59,51,70 ], ctrl: [ 27,91,49,59,53,70 ] } } ] }
		]
	},
	{
		height: 4,
		buttons: [
			{ width: 4, subitems: [ { text: "ctrl_left", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 4, subitems: [ { text: "win_left", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 4, subitems: [ { text: "alt_left", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 16, subitems: [ { text: "space", keycode: { normal: [ 32 ], shift: [ 0 ], alt: [ 0 ], ctrl: [ 0 ] } } ] },
			{ width: 4, subitems: [ { text: "alt_right", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 4, subitems: [ { text: "win_right", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "ctrl_right", keycode: { normal: [], shift: [], alt: [], ctrl: [] } } ] },
			{ width: 3, subitems: [ { text: "left", keycode: { normal: [ 27,91,68 ], shift: [ 27,91,49,59,50,68 ], alt: [ 27,91,49,59,51,68 ], ctrl: [ 27,91,49,59,53,68 ] } } ] },
			{ width: 3, subitems: [
				{ text: "up",	keycode: { normal: [ 27,91,65 ], shift: [ 27,91,49,59,50,65 ], alt: [ 27,91,49,51,65 ], ctrl: [ 27,91,49,59,53,65 ] } },
				{ text: "down",	keycode: { normal: [ 27,91,66 ], shift: [ 27,91,49,59,50,66 ], alt: [ 27,91,49,51,66 ], ctrl: [ 27,91,49,59,53,66 ] } },
			] },
			{ width: 3, subitems: [ { text: "right", keycode: { normal: [ 27,91,67 ], shift: [ 27,91,49,59,50,67 ], alt: [ 27,91,49,59,51,67 ], ctrl: [ 27,91,49,59,51,67 ] } } ] }
		]
	}
] // rows
