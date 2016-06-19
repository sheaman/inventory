module.exports = function (grunt) {

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('reloadPackage', 'Reloads package information', function () {
        grunt.config('pkg', grunt.file.readJSON('package.json'));
        grunt.log.writeln('Package information reloaded.');
    });

    grunt.registerTask('setHostname', 'Set server hostname for notifications', function () {
        grunt.config('meta.hostname', require('os').hostname());
        grunt.log.writeln('Setmeta.hostname to ' + grunt.config('meta.hostname'));
    });

    grunt.registerTask('default', 'Default Grunt task', function () {
        grunt.log.writeln('');
        grunt.log.writeln('Grunt Tasks:');
        grunt.log.writeln('');
        grunt.log.writeln('    `grunt test` - Run jshint and jscs tests and linting.');
        grunt.log.writeln('    `grunt jscs`           - Run jscs');
        grunt.log.writeln('    `grunt jshint`         - Run jshint');
        grunt.log.writeln('');
    });

    grunt.registerTask('test', ['env:qa',
        'jscs',
        'jshint'
    ]);

//'Gruntfile.js', , 'test/**.js'
    // Set config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        env: {
            qa: {
                NODE_ENV: 'qa'
            }
        },

        jscs: {
            files: ['index.js', 'model/**.js', 'routes/**.js', 'modules/**.js'],
            options: {
                config: '.jscsrc'
            }
        },

        jshint: {
            files: ['<%= jscs.files %>'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: 20000
                },
                src: ['test/**/*.js']
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'jscs']
        },

        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'], // '-a' for all files
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false, // handle push via `gitpush` task
                pushTo: '',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },

        shell: {
            // pushProdConfig: {
            //     command: [
            //         'scripts/push-config.sh slapiproxy01.surflinedc.tld .env.prod <%= pkg.name %>',
            //         'scripts/push-config.sh slapiproxy02.surflinedc.tld .env.prod <%= pkg.name %>'
            //     ].join('&&')
            // }
        },

    });
};

