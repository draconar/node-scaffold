'use strict';

module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Times everything
  require('time-grunt')(grunt);

  grunt.initConfig({

    // deletes everything in Dist, except any git files
    clean: {
      begin: {
        files: [{
          dot: true,
          src: [
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      end: {
        files: [{
          dot: true,
          src: [
            //place files here to delete from Dist at the end of the build
          ]
        }]
      }
    },
    // concats all JS files into one final dest file
    concat: {
      dist: {
        src: [
          // 'js/_main.js'
        ],
        // dest: 'dist/js/final.js'
      }
    },
    // Stav this
    connect: {
      all: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          middleware: function(connect, options) {
            return [
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
              connect.static(options.base)
            ];
          }
        }
      }
    },
    // Copies all files
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['**', '!**/node_modules/**', '!**/dist/**', '!**/public/**'],
          dest: 'dist/'
        }, ]
      }
    },
    // Minifies all CSS
    cssmin: {
      combine: {
        files: {
          'dist/css/_________.css': ['dist/css/________.css', 'dist/css/________.css', 'dist/css/______.css']
        }
      }
    },
    express: {
      all: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: ['dist'],
          livereload: true
        }
      }
    },
    // Minifies all HTML
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          useShortDoctype: true,
          minifyJS: true
        },
        files: {
          'dist/________.html': 'dist/______.html'
        }
      }
    },
    // Minifies all min (10-15% savings)
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          src: ['img/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },
    // Opens the files
    open: {
      all: {
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },
    // Processes comments within HTML (see here)
    processhtml: {
      dist: {
        files: {
          'dist/______.html': ['_______.html']
        }
      }
    },
    // Watches files and runs tasks (as defined below)
    regarde: {
      all: {
        files: ['index.html', 'css/**/*.css', 'js/**/*.js'],
        tasks: ['livereload']
      }
    },
    // Uglifies all CSS
    uglify: {
      my_target: {
        files: {
          'dist/js/final.js': ['dist/js/final.js'],
          'dist/js/mobile.js': ['dist/js/mobile.js']
        }
      }
    },
    // Removes any unused Css from key after analyzing value
    uncss: {
      dist: {
        files: {
          'dist/css/tidymin.css': ['dist/index.html'],
          'dist/css/mobile.css': ['dist/mobile.html'],
        }
      }
    },

    watch: {
      all: {
        files: 'index.html',
        options: {
          livereload: true
        }
      }
    }
  });

  // register all the tasks
  grunt.registerTask('serve', [
    'livereload-start',
    'connect',
    'open',
    'regarde'
  ]);
  grunt.registerTask('dist', [
    'express',
    'open',
    'watch'
  ]);
  grunt.registerTask('build', [
    'clean:begin',
    'copy'
  ]);
  grunt.registerTask('test', [

  ]);

};