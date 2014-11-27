/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    paths: {
        build: 'build',
        bin: 'vendor/bin',
        test: 'tests/units/',
        reports: 'reports',
        src: 'src/**/*.php'
    },
    vendor_files: {
        js: [
            'vendorjs/angular/angular.min.js',
            'vendorjs/angular-sanitize/angular-sanitize.min.js',
            'vendorjs/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'vendorjs/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
            'vendorjs/angular-ui-router/release/angular-ui-router.min.js',
            'vendorjs/angular-ui-select/dist/select.min.js'
        ],
        css: [
            'vendorjs/angular-ui-select/dist/select.min.css'
        ],
        assets: [
        ]
    }
};
