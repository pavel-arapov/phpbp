module.exports = function (grunt) {
    'use strict';


    /**
     * Loading required Grunt tasks
     */
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-phpcpd');
    grunt.loadNpmTasks('grunt-phpcs');
    grunt.loadNpmTasks('grunt-phplint');
    grunt.loadNpmTasks('grunt-phpmd');
    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-php-analyzer');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-karma');

    /**
     * Parameter from prompt (command-line)
     */
    var optionIncrement = grunt.option('increment');

    grunt.initConfig({

        /**
         * Defining grunt configuration variables
         */
        pkg: grunt.file.readJSON('package.json'),

        paths: {
            build: 'build',
            bin: 'vendor/bin',
            test: 'tests/units/',
            src: 'src/**/*.php'
        },

        /**
         * Incrementing project version
         */
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json', 'CHANGELOG.md'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },

        /**
         * Uploading documents to github pages
         */
        'gh-pages': {
            options: {
                base: 'doc',
                message: 'Latest auto-generated docs.'
            },
            src: '**/*'
        },

        /**
         *  JavaScript verification based on JSHint tool
         */
        jshint: {
            src: [
                'Gruntfile.js',
                'src/js/**/*.js'
            ],
            test: [
                'src/js/**/*.spec.js'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                jshintrc: true,
                curly: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            }
        },

        /**
         * Cleaning build directory
         */
        clean: [
            '<%= paths.build %>/'
        ],

        /**
         * Copy project to a build directory
         */
        copy: {
            main: {
                files: [
                    {
                        src: ['**'],
                        dest: '<%= paths.build %>',
                        cwd: 'src',
                        expand: true
                    }
                ]
            }
        },

        /**
         * CSS minification task
         */
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= paths.build %>',
                src: ['**/*.css', '!*.min.css'],
                dest: '<%= paths.build %>'
            }
        },

        /**
         * JavaScript minification
         */
        uglify: {
            compile: {
                files:  [{
                    expand: true,
                    cwd: '<%= paths.build %>/js',
                    src: '**/*.js',
                    dest: '<%= paths.build %>/js'
                }]
            }
        },

        /**
         * Image size optimization
         */
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.build %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= paths.build %>'
                }]
            }
        },

        /**
         * PHP Copy Paste Detector
         */
        phpcpd: {
            src: {
                dir: 'src'
            },
            options: {
                bin: '<%= paths.bin %>/phpcpd'
            }
        },

        /**
         * PHP Code Sniffer
         *
         * Create a report about coding style PSR-1 : http://www.php-fig.org/psr/psr-1/
         */
        phpcs: {
            src: {
                dir: ['<%= paths.src %>']
            },
            options: {
                bin: '<%= paths.bin %>/phpcs',
                standard: 'PSR1'
            }
        },

        /**
         * PHP Lint
         */
        phplint: {
            src: '<%= paths.src %>'
        },

        /**
         * PHP Mess Detector
         */
        phpmd: {
            src: {
                dir: 'src'
            },
            options: {
                bin: '<%= paths.bin %>/phpmd',
                reportFormat: 'text',
                rulesets: ['codesize', 'controversial', 'design', 'naming', 'unusedcode'].join(',')
            }
        },

        /**
         * PHP Unit runs the tests
         */
        phpunit: {
            classes: {
                dir: '<%= paths.test %>'
            },
            options: {
                bin: '<%= paths.bin %>/phpunit'
            }
        },

        /**
         * PHP Analyzer, advanced php code analyzer
         */
        php_analyzer: {
            src: {
                dir: 'src'
            },
            options: {
                bin: '<%= paths.bin %>/phpalizer'
            }
        },

        /**
         * Creates a changelog on a new version.
         */
        changelog: {
            options: {
                dest: 'CHANGELOG.md',
                template: 'changelog.tpl'
            }
        },

        /**
         * Karma server configuration
         */
        karma: {
            unit: {
                configFile: 'karma/karma.conf.js'
            }
        },

        /**
         * Asking the type of version that we have to increment
         */
        prompt: {
            commit: {
                options: {
                    questions: [
                        {
                            config: 'deploy.increment',
                            type: 'list',
                            message: 'Which part of the version number do you want to increment? (Current: v<%= pkg.version %>)',
                            choices: [
                                {
                                    value: 'build',
                                    name: 'build (x.y.z-N) — append build number for pre-release'
                                },
                                {
                                    value: 'git',
                                    name: 'git (x.y.z-NNNNN) — append git revision for pre-release'
                                },
                                {
                                    value: 'patch',
                                    name: 'patch (x.y.Z) — backwards-compatible bug fixes'
                                },
                                {
                                    value: 'minor',
                                    name: 'minor (x.Y.z) — added functionality in a backwards-compatible manner'
                                },
                                {
                                    value: 'major',
                                    name: 'major (X.y.z) — incompatible API changes'
                                }
                            ],
                            when: function () {
                                return !optionIncrement;
                            }
                        }
                    ]
                }
            }
        },

        /**
         * Shell command running
         */
        shell: {
            options: {
                stdout: true
            },
            phpdcd: {
                command: '<%= paths.bin %>/phpdcd src/'
            },
            phpdoc: {
                command: '<%= paths.bin %>/phpdoc.php src'
            },
            phploc: {
                command: '<%= paths.bin %>/phploc src/'
            },
            phpalizer: {
                command: '<%= paths.bin %>/phpalizer run src'
            },
            'security-checker': {
                command: '<%= paths.bin %>/security-checker security:check'
            }
        },

        /**
         * Watch is listening the file modification to run the tests
         */
        watch: {
            jshint: {
                files: '<%= jshint.src %>',
                tasks: 'jshint:gruntfile'
            },
            phpcpd: {
                files: '<%= phpcpd.src.dir %>',
                tasks: 'phpcpd'
            },
            phpcs: {
                files: '<%= phpcs.src.dir %>',
                tasks: 'phpcs'
            },
            phplint: {
                files: '<%= phplint.src %>',
                tasks: 'phplint'
            },
            phpunit: {
                files: [
                    '<%= phpunit.classes.dir %>/**/*.php',
                    '<%= phpcs.src.dir %>'
                ],
                tasks: 'phpunit'
            },
            'security-checker': {
                files: 'composer.json',
                tasks: 'security-checker'
            }
        }
    });

    grunt.registerTask('bump-increment', 'Increment the version number.', function (inc) {
        var increment = inc || optionIncrement || grunt.config('deploy.increment');

        grunt.task.run('bump:' + increment + ':bump-only');
    });

    /**
     * Renaming tasks (just for simplification)
     */
    grunt.registerTask('phpdcd', ['shell:phpdcd']);
    grunt.registerTask('phpdoc', ['shell:phpdoc']);
    grunt.registerTask('phploc', ['shell:phploc']);
    grunt.registerTask('phpalizer', ['shell:phpalizer']);
    grunt.registerTask('security-checker', ['shell:security-checker']);

    /**
     * Default run: build + watch to keep developing environment active
     */
    grunt.registerTask('default', ['build', 'watch']);

    /**
     * Only test suits
     */
    grunt.registerTask('test', ['phpunit', 'karma']);

    /**
     * Code quality tasks
     */
    grunt.registerTask('quality', ['jshint', 'phplint', 'phpcs', 'phpcpd', 'phploc', 'phpdcd', 'phpmd', 'phpalizer', 'security-checker']);

    /**
     * Regenerating documentation
     */
    grunt.registerTask('doc', ['phpdoc', 'gh-pages']);

    /**
     * Build project
     */
    grunt.registerTask('build', [ 'test', 'clean', 'copy', 'cssmin', 'uglify', 'imagemin']);

    /**
     * Commit project
     */
    grunt.registerTask('commit', ['prompt:commit', 'bump-increment', 'changelog']);

    /**
     * Creating tag and do the commit with "version" information
     */
    grunt.registerTask('label', ['bump::commit-only']);

};