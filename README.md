PHP Boilerplate
=====

PHP Boilerplate is an attempt to create an ideal structure for PHP high performance project.

PHP Boilerplate based on Grunt.js, Bower, Composer. Test suits provided by PHPUnit and Karma with Jasmine.

## Overall directory structure

```
phpbb/
  |- config/
  |- karma/
  |- scripts/
  |- src/
  |  |- js/
  |  |  |- <javascript files>
  |  |- img/
  |  |  |- <images files>
  |  |- css/
  |  |  |- <css files>
  |- vendor/
  |  |- <php libraries>
  |- vendorjs/
    |  |- <javascript libraries>
  |- .bowerrc
  |- bower.json
  |- composer.json
  |- composer.lock
  |- build.config.js
  |- Gruntfile.js
  |- package.json
```



What follows is a brief description of each entry, but most directories should contain
their own `README.md` file with additional documentation, so browse around to
learn more.

- `config/` - configuration files.
- `karma/` - test configuration.
- `scripts/` - scripts files for command-line launch.
- `src/` - our application sources. [Read more &raquo;](src/README.md)
- `src/js` - JavaScript front-end source code. [Read more &raquo;](src/js/README.md)
- `src/img` - images directory. [Read more &raquo;](src/img/README.md)
- `vendor/` - third-party php libraries. [Composer](http://getcomposer.org) will install
  packages here.
- `vendorjs/` - third-party javascript libraries. [Bower](http://bower.io) will install
  packages here.
- `.bowerrc` - the Bower configuration file. This tells Bower to install
  components into the `vendorjs/` directory.
- `bower.json` - this is our project configuration for Bower and it contains the
  list of Bower dependencies we need.
- `composer.json` and `composer.lock` - these are our project configuration for Composer and they contain the
  list of PHP dependencies we need.
- `Gruntfile.js` - our build script; see "The Build System" below.
- `module.prefix` and `module.suffix` - our compiled application script is
  wrapped in these, which by default are used to place the application inside a
  self-executing anonymous function to ensure no clashes with other libraries.
- `package.json` - metadata about the app, used by NPM and our build script. Our
  NPM dependencies are listed here.

## Environment

`GooTickets` uses [Grunt](http://gruntjs.org) as its build system, [Bower](http://bower.io) as a dependency
management tool for a front-end solutions, [Karma](http://karma-runner.github.io/0.12/index.html) as a test server
for a Front-end testing, so [Node.js](http://nodejs.org) is required.

At the begging you have to install [Node.js](http://nodejs.org) with [npm](https://www.npmjs.org/) (node package manager).
Then you have `npm` installed, you can install other tools.
Attention : for windows users you have to launch next commands in `Git Shell` or `Git Bash` (not on `cmd.exe`)


```sh
$ npm -g install grunt-cli karma bower
```

This will install grunt command line, karma server and bower globally, if you are not root, use `sudo` command.
And then install the remaining dependencies which are described into `package.json` locally into the project:

```sh
$ npm install
```

Install all JavaScript dependencies described in `bower.json`

```sh
$ bower install
```

### Composer

[Composer](http://getcomposer.org/) is a php package manager, see the installation principle on a website.
[for windows only](https://getcomposer.org/doc/00-intro.md#installation-windows)

(*do not use it on a local machine*)
PHP analysis tools that have to be installed globally:
```sh
$ composer global require 'squizlabs/php_codesniffer=*'
$ composer global require 'phpmd/phpmd=*'
$ composer global require 'scrutinizer/php-analyzer:*@dev'
```
How to define in $PATH composer/bin directory, UNIX style:
```sh
export PATH="$PATH":~/.composer/vendor/bin/
```
Can add this line to `.profile` file to have defined this variable after login

(*use classic installation on a local machine*)
composer.json describes all dependencies to install locally.

Run next command at the project's root folder to install PHP dependencies:
```sh
$ composer install
```

## Build System

Our build system based on Grunt solution and whole configuration can be found in `Gruntfile.js`.
We have configured next tasks:

```sh
$ grunt
```
default task is in development, currently it runs `grunt build` and `grunt watch`.

```sh
$ grunt test
```
launches phpunit and karma tests;

```sh
$ grunt quality
```
launches all quality tools, be aware - it takes a lot of time currently;

```sh
$ grunt build
```
makes the project into the `/build` with css, js, image minificated files;

```sh
$ grunt version
```
creates a new version, it has a prompt menu to select which version we will increment, makes an update into changelog;

```sh
$ grunt commit
```
creates new release tag, commits and pushes package.json, bower.json and CHANGELOG.md with updated information;

There is a possibility to launch precised task, for example,
```sh
$ grunt sass
```
creates a new `global.css` from `global.scss` into `src` folder

## Quality Tools

### PHP
[PHP Lint](http://www.php.net/manual/en/function.php-check-syntax.php) is a basic static analyser built-in into PHP.
```sh
$ grunt phplint
```
launches phplint for `/src` directory with *.php pattern

[PHPLOC](https://github.com/sebastianbergmann/phploc) is a tool for quickly measuring the size and analyzing
the structure of a PHP project.
```sh
$ grunt phploc
```

[PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer) is a PHP5 script that tokenises PHP, JavaScript
and CSS files to detect violations of a defined coding standard. It is an essential development tool that ensures your
code remains clean and consistent. It can also help prevent some common semantic errors made by developers.
```sh
$ grunt phpcs
```

[PHP Dead Code Detector](https://github.com/sebastianbergmann/phpdcd) scans a PHP project for all declared functions
 and methods and reports those as being "dead code" that are not called at least once.
```sh
$ grunt phpdcd
```

[PHP Copy Paste Detector](https://github.com/sebastianbergmann/phpcpd) is a Copy/Paste Detector (CPD) for PHP code.
```sh
$ grunt phpcpd
```

[PHP Analyzer](https://scrutinizer-ci.com/docs/tools/php/php-analyzer/) is powerful analyzer of PHP project code
```sh
$ grunt phpalizer
```

[PHP Mess Detector](http://phpmd.org/) is tool that analyse code for possible bugs, suboptimal code, overcomplicated
expressions, unused parameters, functions, methods.
```sh
$ grunt phpmd
```

[PHP Depend](http://pdepend.org/) - analyzer and metric tool
```sh
$ grunt pdepend
```

[SensioLabs Security Checker](https://github.com/sensiolabs/security-checker) is a tool that checks if your application
uses dependencies with known security vulnerabilities. It uses the SensioLabs Security Check Web service and
the Security Advisories Database.
```sh
$ grunt security-checker
```

### JavaScript
[JSHint](http://jshint.com/) - JavaScript code quality tool
```sh
$ grunt jshint
```
launches jshint for `/src/js` directory

[JavaScript Code Checker](https://github.com/mdevils/node-jscs) - JavaScript tool to analyse code style
```sh
$ grunt jscs
```
launches code checker for `/src/js` directory with Yandex preset.

[Uglify](https://github.com/mishoo/UglifyJS2) is a JavaScript parser, minifier, compressor or beautifier toolkit.
```sh
$ grunt uglify
```
We use as a minificator for all js files into `/src/js/` directory with `.js` pattern

### CSS
[CSSLint](http://csslint.net/) - CSS code quality tool
```sh
$ grunt csslint
```

[CSSMin](https://www.npmjs.org/package/grunt-contrib-cssmin) - css minification tool
```sh
$ grunt cssmin
```

### Images
Minification
```sh
$ grunt imagemin
```

## Test frameworks

### Karma with Jasmine
We use karma to launch jasmin test suites. See how to create [Jasmine](http://jasmine.github.io/2.0/introduction.html)
tests at [README](src/js/jasmine/README.md) in `/src/js/jasmine/` folder. To launch only karma test server use
```sh
$ grunt karma
```

It launches Karma test server with PhantomJS browser and executes all jasmine test from `/src/js/jasmine/` folder.

### PHP Unit
[PHPUnit](http://phpunit.de/) is a programmer-oriented testing framework for PHP.
```sh
$ grunt phpunit
```
