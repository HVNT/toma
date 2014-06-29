/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 2:03 PM
 * File: Gruntfile.js
 */

'use strict';
var path = require('path');
var templateEnv = '';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // configurable paths
    var yeomanConfig = {
        app: 'src',
        dist: 'build',
        stage: '.tmp'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: ['<%= yeoman.app %>/**/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            app: {
                files: [
                    '<%= yeoman.app %>/app/**/*'
                ],
                tasks: ['copy:app']
            },
            core: {
                files: [
                    '<%= yeoman.app %>/core/**/*'
                ],
                tasks: ['copy:core']
            },
            assets: {
                files: [
                    '<%= yeoman.app %>/assets/**/*'
                ],
                tasks: ['copy:assets']
            },
            environment: {
                files: [
                    '<%= yeoman.app %>/environment/**/*'
                ],
                tasks: ['copy:environment']
            },
            template: { // not doing shit right now, todo
                files: [
                    '<%= yeoman.app %>/{,**/}*.template'
                ],
                tasks: ['']
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.all.options.port %>'
            }
        },
        clean: {
            options: {
                dot: true
            },
            dist: {
                files: [{
                    src: [
                        '<%= yeoman.dist %>',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            stage: {
                files: [{
                    src: [
                        '<%= yeoman.stage %>'
                    ]
                }]
            },
            template: {
                files: [
                    '<%= yeoman.app %>/{,**/}*.template'
                ],
                tasks: ['']
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '<%= yeoman.stage %>/styles',
                imagesDir: '<%= yeoman.app %>/assets/img',
                javascriptsDir: '<%= yeoman.app %>/app',
                importPath: '<%= yeoman.app %>/styles',
                relativeAssets: true
            },
            prod: {
                options: {
                    debugInfo: false,
                    outputStyle: 'compressed'
                }
            },
            dev: {
                options: {
                    debugInfo: true,
                    outputStyle: 'expanded'
                }
            }
        },
        copy: {
            toStage: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.stage %>',
                    src: [
                        'app/**/*',
                        'components/**/*',
                        'environment/**/*',
                        'core/**/*',
                        'assets/**/*',
                        '*.html*'
                    ]
                }]
            },
            toDist: {
              files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.stage %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'app/**/*',
                        'components/**/*',
                        'environment/**/*',
                        'core/**/*',
                        'assets/**/*',
                        '*.html*'
                    ]
                }]
            },
            app: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.stage %>',
                    src: [
                        'app/**/*'
                    ]
                }]
            },
            core: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.stage %>',
                    src: [
                        'core/**/*'
                    ]
                }]
            },
            assets: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.stage %>',
                    src: [
                        'assets/**/*'
                    ]
                }]
            },
            environment: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.stage %>',
                    src: [
                        'environment/**/*'
                    ]
                }]
            }
        },
        concat: { // revisit
            demo: {
                'src': [
                    '<%= yeoman.stage %>/app/**/*.js',
                    '<%= yeoman.stage %>/core/**/*.js',
                    '<%= yeoman.stage %>/components/**/*.js',
                    '!<%= yeoman.stage %>/app/**/*.unit.js',
                    '!<%= yeoman.stage %>/app/**/*.e2e.js'
                ],
                dest: '<%= yeoman.dist %>/demo/scripts/scripts.js'
            },
            mock: {
                src: [
                    '<%= yeoman.stage %>/demo/scripts/scripts.js',
                    '<%= yeoman.app %>/components/angular-mocks/angular-mocks.js',
                    '<%= yeoman.app %>/app/mock.js'
                ],
                dest: '<%= yeoman.stage %>/demo/scripts/scripts.js'
            }
        },
        template: {
            mock: {
                files: {
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'mock'
            },
            local: {
                files: {
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'local'
            },
            demo: {
                files: {
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'demo'

            },
            dev: {
                files: {
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'dev'
            },
            prod: {
                files: {
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'prod'
            },
            reload: {
                files: {
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'prod'
            }
        },
        rev: {
            files: {
                src: [
                      '<%= yeoman.stage %>/demo/scripts/{,*/}*.js',
                      '<%= yeoman.stage %>/demo/styles/{,*/}*.css',
                      '<%= yeoman.stage %>/demo/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                      '<%= yeoman.stage %>/demo/styles/fonts/*'
                  ]
             }
        },
        express: {
            options: {
                port: 8000,
                hostname: '0.0.0.0',
                bases: path.resolve('/.tmp'),
                server: path.resolve('./server'),
                livereload: true
            }
        },
        karma: {
            unit: {
                configFile: 'config/karma-unit.conf.js',
                singleRun: true
            },
            e2e: {
                configFile: 'config/karma-e2e.conf.js',
                singleRun: true
            }
        },
        useminPrepare: {
            html: '<%= yeoman.stage %>/index.html',
            css: '<%= yeoman.stage %>/styles/main.css'
        },
        usemin: {
            options: {
                dirs: [
                    '<%= yeoman.stage %>'
                ]
            },
            html: [
                '<%= yeoman.stage %>/{,*/}*.html'
            ],
            css: [
                '<%= yeoman.stage %>/styles/{,*/}*.css'
            ]
        },
        imagemin: {
            files: [{
                      expand: true,
                      cwd: '<%= yeoman.app %>/assets/img',
                      src: '{,*/}*.{png,jpg,jpeg}',
                      dest: '<%= yeoman.stage %>/assets/img'
                  }]
        },
        cssmin: {
            files: {
                      '<%= yeoman.stage %>/styles/main.css': [
                          '<%= yeoman.stage %>/styles/main.css'
                      ]
                  }
        },
        ngmin: {
            files: [{
                      expand: true,
                      cwd: '<%= yeoman.stage %>/scripts',
                      src: '*.js',
                      dest: '<%= yeoman.stage %>/scripts'
                  }]
        },
        uglify: {
            options: {
                mangle: false
            },
            files: {
                    '<%= yeoman.stage %>/scripts/scripts.js': [
                        '<%= yeoman.stage %>/scripts/scripts.js'
                    ]
                }
        }
    });

    // When template task is run, sets watch task of template to environment
    grunt.util.hooker.hook(grunt.task, function() {
        var task = grunt.task.current.nameArgs;
        if (task.split(':')[0] === 'template') {
            grunt.config(['watch', 'template', 'tasks'], [task]);
        }
    });

    grunt.registerTask('server', [
        'express',
        'open',
        'watch'
    ]);

    grunt.registerTask('local', [
        'clean:stage',
        'compass:dev',
        'copy:toStage',
        'template:local',
        'clean:template',
        'server'
    ]);

    grunt.registerTask('mock', [
        'clean:stage',
        'compass:dev',
        'copy:toStage',
        'template:mock',
        'clean:template',
        'server'
    ]);

    grunt.registerTask('dev', [
        'clean:stage',
        'compass:dev',
        'copy:toStage',
        'template:local',
        'clean:template',
        'server'
    ]);

    grunt.registerTask('buildDemo', [
        'clean:stage',
        'copy:toStage',
        'compass:prod',
        'template:demo',
        'clean:template',
        // 'karma:unit',
        'useminPrepare',
        'concat:.tmp/scripts/scripts.js',
        'concat:.tmp/styles/main.css',
        'imagemin',
        'cssmin',
        'ngmin',
        'uglify',
        'concat:mock',
        'rev',
        'usemin',
        'clean:dist',
        'copy:toDist'
    ]);

    grunt.registerTask('buildDev', [
        'clean:stage',
        'copy:toStage',
        'compass:prod',
        'template:dev',
        'clean:template',
        // 'karma:unit',
        'useminPrepare',
        'concat:.tmp/scripts/scripts.js',
        'concat:.tmp/styles/main.css',
        'imagemin',
        'cssmin',
        'ngmin',
        'uglify',
        'rev',
        'usemin',
        'clean:dist',
        'copy:toDist'
    ]);

    grunt.registerTask('buildProd', [
        'clean:stage',
        'copy:toStage',
        'compass:prod',
        'template:prod',
        'clean:template',
        // 'karma:unit',
        'useminPrepare',
        'concat:.tmp/scripts/scripts.js',
        'concat:.tmp/styles/main.css',
        'imagemin',
        'cssmin',
        'ngmin',
        'uglify',
        'rev',
        'usemin',
        'clean:dist',
        'copy:toDist'
    ]);
};
