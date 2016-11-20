// transcoding-service-output/WapoVideo
TWP = window.TWP || {};
TWP.PostTV = TWP.PostTV || {};
TWP.PostTV.WapoVideoConfig = {
	wowza_uuids: [
		'92d280a2-7d90-11e0-b6cc-e4e4a8a38cf0', 	//postlive1
		'cbf7a484-7d90-11e0-b6cc-e4e4a8a38cf0', 	//postlive2
		'02c9ecd4-1463-11e5-9518-f9e0a8959f32', 	//postlive3
		'7305a88c-9779-11e5-94f0-9eeaff906ef3'  	//postlive4
	],

	bandito: {
		timeout: 2000
	},

	preloadVideojson: {
		timeout: 4000
	},

	featureFlags: {
		LIVE_JW: true,				// possible values: true, false
		BANDITO: true,				// possible values: true, false
		PRELOAD_VIDEOJSON: true, 	// possible values: true, false, 'live'
		POSTLOAD_VARIANTS: true, 	// possible values: true, false
		ALLOW_CAPTION: true, 		// possible values: true, false
		FORCE_CAPTION: false,           // possible values: true, false -- for testing
		VIDEOJSON_PROXY: true 		// possible values: true, false
	},

	embedMaxBitrates: {
		desktop: {maxBitrate: 2000}	// optimized for PB article embeds
	}
};