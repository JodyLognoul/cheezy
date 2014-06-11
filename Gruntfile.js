module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'public/app',
        dist: 'public/dist',
        tmp: 'public/.tmp'
    };

    // Project configuration.
    grunt.initConfig({

        // Project settings
        config: config,

        // Run some tasks in parallel to speed up build process
        concurrent: {
            dist: [
                'sass',
                'copy:styles',
                // 'imagemin',
                // 'svgmin'
            ]
        },

        // Copies remaining files to places other tasks can use
        copy: {
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '<%= config.tmp %>/styles/',
                src: '{,*/}*.css'
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.tmp %>',
                        '<%= config.dist %>/*'
                    ]
                }]
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/app/styles',
                    src: ['*.sass'],
                    dest: '<%= config.tmp %>/styles',
                    ext: '.css'
                }]
            }
        }
    });

    // Build task(s).
    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist'
    ]);


    // Default task(s).
    grunt.registerTask('default', ['build']);

};