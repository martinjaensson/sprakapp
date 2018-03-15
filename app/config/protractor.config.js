exports.config = {
	directConnect: true,

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		'browserName': 'chrome'
	},

	// Framework to use. Jasmine is recommended.
	framework: 'jasmine',
	
	// Spec patterns are relative to this config file
	specs: ['../e2e/build/*.e2e-spec.js'],

	// Base URL for application server
	baseUrl: 'http://localhost:8080',

	// For angular tests
	useAllAngular2AppRoots: true,


	onPrepare: function () {
		// SpecReporter
		var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
		jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));
		// jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));

		// debugging
		// console.log('browser.params:' + JSON.stringify(browser.params));
		// jasmine.getEnv().addReporter(new Reporter( browser.params )) ;

		// Allow changing bootstrap mode to NG1 for upgrade tests
		global.setProtractorToNg1Mode = function () {
			browser.useAllAngular2AppRoots = false;
			browser.rootEl = 'body';
		};
	},

	jasmineNodeOpts: {
		// defaultTimeoutInterval: 60000,
		defaultTimeoutInterval: 10000,
		showTiming: true,
		print: function () { }
	}
};
