'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    clean: {
      files: ['_site']
    },
    less: {
      development: {
        files: {
          'css/styles.css': 'css/less/styles.less'
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    },
    // concat: {
    //   dist: {
    //     src: ['js/<%= pkg.name %>.js'],
    //     dest: 'dist/js/<%= pkg.name %>.js'
    //   },
    // },
    watch: {
      styles: {
        files: ['css/less/*.less'],
        tasks: ['less']
      }
    },
    uglify: {
      publish: {
        files: {
          'js/scripts.min.js': ['js/scripts.js']
        }
        // src: '<%= concat.dist.dest %>',
        // dest: 'dist/js/<%= pkg.name %>.min.js'
      },
    },
    jekyll: {
      server: {
        server : true,
        // Add the --watch flag, i.e. rebuild on file changes
        watch: true,
        baseurl: "''"
      },
      build: {
        server: false
      }
    }
    // exec: {
    //   whitespace: {
    //     cmd: './txt-fix-whitespaces.py -btcn 2 js/*.js -vvv'
    //   },
    //   list_files: {
    //     cmd: 'ls -l **'
    //   }
    // }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-jekyll');


  // Run Jekyll build with environment set to production
  grunt.registerTask('jekyll-production', function() {
    grunt.log.writeln('Setting environment variable JEKYLL_ENV=production');
    process.env.JEKYLL_ENV = 'production';
    grunt.task.run('jekyll:build');
  });

  // Default task.
  grunt.registerTask('default', ['less', 'watch']);
  grunt.registerTask('server', 'jekyll:server'); //jekyll serve --watch --baseurl ''
  
  grunt.registerTask('build', ['less', 'jekyll']);
  grunt.registerTask('publish', ['less', 'cssmin', 'uglify', 'jekyll-production']);


};