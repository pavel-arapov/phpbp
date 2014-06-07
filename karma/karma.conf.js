/**
 * Created by genius on 03/06/2014.
 */

module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../src/js/',

        // frameworks to use
        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-firefox-launcher'],

        // list of files / patterns to load in the browser
        files: [
            '../../vendorjs/jquery/jquery.min.js',
            '../../vendorjs//lib/jasmine-jquery.js',
            '../../vendorjs//lib/mock-ajax.js',
            {
                pattern: 'jasmine/fixtures/**/*.html',
                watched: true,
                included: false,
                served: true
            }
        ],

        // list of files to exclude
        exclude: [
        ],

        // test results reporter to use
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 18000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};