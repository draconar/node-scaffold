//THE ORDER OF THESE TASKS IS CRUCIAL. STUDY THE DOCS here... http://gruntjs.com/plugins

'use strict';

module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Times everything
  require('time-grunt')(grunt);

  grunt.initConfig({

    // deletes everything in Dist, except any . files
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
          'js/main.js',
          'js/secondary'
        ],
        dest: 'dist/js/final.js'
      }
    },
    // connects on the local server
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
    // Copies all files except '!______'
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['**', '!**/node_modules/**', '!**/dist/**'],
          dest: 'dist/'
        }, ]
      }
    },
    // Minifies all CSS
    cssmin: {
      combine: {
        files: {
          'dist/css/final.css': ['dist/css/main.css', 'dist/css/secondary.css']
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
          'dist/index.html': 'dist/index.html'
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
          'dist/index.html': ['index.html']
        }
      }
    },
    // Watches files and runs tasks (as defined below)
    regarde: {
      all: {
        files: ['index.html', 'css/**/*.css', 'css/**/*.scss', 'js/**/*.js'],
        tasks: ['livereload']
      }
    },
    sass: {
      dist: {
        files: {
          'css/main.css': 'css/main.scss'
        }
      }
    },
    // Uglifies all JS
    uglify: {
      dist: {
        files: {
          'dist/js/final.js': ['dist/js/final.js']
        }
      }
    },
    // Removes any unused CSS after analyzing HTML
    uncss: {
      dist: {
        files: {
          'dist/css/final.css': ['dist/index.html']
        }
      }
    },
    // used to watch and livereload
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
    'sass'
  ]);

};