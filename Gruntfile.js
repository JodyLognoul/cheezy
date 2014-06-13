module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'public/app',
        dist: 'public/dist'
    };

    // Project configuration.
    grunt.initConfig({

        // Project settings
        config: config,
        
        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= config.tmp %>/styles/'
                }]
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            compass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:dev', 'autoprefixer']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            }            
        },        
        // Concat the css files
        concat_css: {
            all: {
                src: ["<%= config.tmp %>/styles/*.css"],
                dest: "<%= config.tmp %>/styles/all.css"
            },
        },

        // Minify the css files
        cssmin: {
            dist: {
                files: {
                    '<%= config.tmp %>/styles/all.min.css': [
                        '<%= config.tmp %>/styles/all.css'
                    ]
                }
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            dev: [
                'compass:dev',
                'copy:styles',
            ],
            dist: [
                'sass:dist',
                'copy:styles',
                // 'imagemin',
                // 'svgmin'
            ]
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                expand: true,
                dot: true,
                cwd: '<%= config.tmp %>/styles',
                dest: '<%= config.dist %>/styles/',
                src: '{,*/}*.min.css'
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '<%= config.dist %>/styles/',
                src: '{,*/}*.css'
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>'
                    ]
                }]
            }
        },
        // Compiles Sass to CSS using Compass
        compass: {                  
            dev: {
                options: {
                    outputStyle: 'compressed',
                    importPath: 'public/bower_components/bootstrap-sass-official/vendor/assets/stylesheets',
                    sassDir: '<%= config.app %>/styles',
                    cssDir: '<%= config.dist %>/styles'
                }
            }
        },        
        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/app/styles',
                    src: ['*.sass'],
                    dest: '<%= config.dist %>/styles',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.registerTask('serve', [
        'clean:dist',
        'concurrent:dev',
        'autoprefixer',
        'watch'
    ]);

    // Build task(s).
    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dev',
        'autoprefixer',
        'concat_css:all',
        'cssmin:dist',
        'copy:dist'
    ]);


    // Default task(s).
    grunt.registerTask('default', ['serve']);

};