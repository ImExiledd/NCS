/*
*
*	NCS is Copyright (C) Exile, 2021.
*   NCS is licensed under MIT. Please give credit
*   Where credit is due.
*
*/

const NCS = {
	// all code goes here, to prevent conflicts with Musiqpad or other scripts.
	settings: {
		versionControl: {
			latest: "https://cdn.jsdelivr.net/gh/ImExiledd/NCS@new/latest.json",
			current: "2.0.0"
		}
	},
	funct: {
		versionCheck: function() {
			var latestJson = $.get(NCS.settings.versionControl.latest);
		}
	}

};