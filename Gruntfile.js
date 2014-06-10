module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Project configuration.
    grunt.initConfig({

        // Project settings
        config: config,

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/styles/sass',
                    src: ['*.sass'],
                    dest: 'public/styles/css',
                    ext: '.css'
                }]
            }
        }
    });


    // Default task(s).
    grunt.registerTask('default', ['sass']);

};