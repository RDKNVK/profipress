module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /*livereloadx: {
            static: true, // livereload -s
            //proxy: "http://localhost/", //livereloadx -y http://localhost/
            dir: '.'
        },*/
        watch: {
            scripts: {
                files: [
                    'scripts/*.js',
                    '!scripts/main.js',
                    '!scripts/main.full.js',
                    '!scripts/html5shiv.js',
                    '!scripts/lib/*'
                ],
                tasks: ['jshint', 'concat', 'uglify'],
                options: {
                    spawn: true,
                },
            },
            css: {
                files: ['less/*.less'],
                tasks: ['less', 'autoprefixer'],
                options: {
                    spawn: true,
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'scripts/*.js',
                    '!scripts/main.js',
                    '!scripts/main.full.js',
                    '!scripts/html5shiv.js',
                    '!scripts/lib/*'
                ],
                dest: 'scripts/main.full.js'

            }
        },
        uglify: {
            build: {
                src: 'scripts/main.full.js',
                dest: 'scripts/main.js'
            }
        },
        less: {
            min: {
                options: {
                    compress: true,
                    cleancss: true,
                    sourceMap: true,
                    //sourceMapBasepath: 'less',
                    sourceMapFilename: 'styles/style.css.map'
                },
                files: {
                    'styles/style.css': 'less/style.less', // destination: source
                    'styles/print.css': 'less/print.less'
                }
            },
            full: {
                options: {},
                files: {
                    'styles/style.full.css': 'less/style.less', // destination: source
                    'styles/print.full.css': 'less/print.less'
                }
            }
        },

        autoprefixer: {
            min: {
                options: {
                    browsers: ['last 3 version', '> 1%']
                },
                src: 'styles/style.css'
            },
            full: {
                options: {
                    browsers: ['last 3 version', '> 1%']
                },
                src: 'styles/style.full.css'
            }
        },

        jshint: {
            files: ['scripts/*.js'],
            options: {
                globals: {
                    browser: true,
                    jQuery: true,
                    console: true,
                    document: true,
                    module: true
                },
                ignores: [
                    'scripts/lib/*',
                    'scripts/main.js',
                    'scripts/main.full.js'
                ]
            }
        },
        htmllint: {
            all: ["*.html"]
        },
        csslint: {
            /*strict: {
                options: {
                    import: 2
                },
                src: ['style/style.full.css']
            },*/
            lax: {
                options: {
                    import: false
                },
                src: ['path/to/**/*.css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-css');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-html');
    //grunt.loadNpmTasks('livereloadx');

    grunt.registerTask('default', ['jshint', 'htmllint']);

};
