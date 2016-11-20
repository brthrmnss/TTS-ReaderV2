// transcoding-service-output/JWPlayer
TWP = window.TWP || {};
TWP.PostTV = TWP.PostTV || {};
TWP.PostTV.jwPlayerConfig = {
	adLoadWaitTime: 40, // seconds
	editorialPlaybackWaitTime: 5, // seconds
	spinnerWaitTime: 1.0, // seconds
	endscreenVideosWaitTime: 8, // seconds
	captionsConfidenceMinimum: 0.75,

	httpsToHttp: false, // ((document.cookie.match(/X-WP-Split=([^;]+)/) ? RegExp.$1 : '').toUpperCase() !== 'B'),
	skin: 'bekle-posttv', // possible values: ['bekle', 'bekle-posttv', 'default']

	// any "AdX" ads for which we need to shut off our ad skip
	adSenseRegEx: /AdSense|AdX|DBM/i,

	adType: {
		mobile: 'vast',
		tablet: 'vast',
		desktop: {
			html5: 'googima',
			flash: 'googima'
		}
	},

	liveStreamPreference: ['.m3u8'],

	maxBitrates: {
		mobile: {maxBitrate: 300, fallback: 2000},
		tablet: {maxBitrate: 600, fallback: 2000},
		desktop: {
			portrait: { // orientation
				'.mp4': {maxBitrate: 1200}
			},
			'.smil': {maxBitrate: 5400}, // stream preference
			maxBitrate: 2000
		}
	},

	streamPreferences: {
		mobile: {
			android: {streamPreference: ['.mp4', '.m4v']},
			streamPreference: ['_mobile.m3u8', '.m3u8', '.mp4', '.m4v']
		},
		tablet: {
			android: {streamPreference: ['.mp4', '.m4v']},
			streamPreference: ['_master.m3u8', '.m3u8', '.mp4', '.m4v']
		},
		desktop: {
			html5: {
				safari: {streamPreference: ['_master.m3u8', '.m3u8', '.mp4', '.m4v']},
				streamPreference: ['.mp4', '.m4v']
			},
			streamPreference: ['_master.m3u8', '.m3u8', '.smil', '.mp4', '.m4v']
		}
	},

	wowza_uuids: [
		'92d280a2-7d90-11e0-b6cc-e4e4a8a38cf0', 	//postlive1
		'cbf7a484-7d90-11e0-b6cc-e4e4a8a38cf0', 	//postlive2
		'02c9ecd4-1463-11e5-9518-f9e0a8959f32', 	//postlive3
		'7305a88c-9779-11e5-94f0-9eeaff906ef3'  	//postlive4
	],

	bandito: {
		timeout: 2000
	},

	fbInstantAds: false,

	event9992Minimum: 1000,
	event9992Throttle: 5000
};