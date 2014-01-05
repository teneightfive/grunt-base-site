module.exports = function(grunt) {
  'use strict';

  // Load all plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Create watch task to watch Sass and JS directories during Dev
		watch: {
			css: {
				files: ['src/scss/*.scss', 'src/scss/**/*.scss'],
				tasks: ['compass:development'],
			},
      templates: {
        files: ['src/js/tpl/*'],
        tasks: ['jst', 'concat:javascript', 'clean:postBuild'],
      },
      js: {
        files: ['Gruntfile.js', 'src/js/mod/*', 'src/js/*.js'],
        tasks: ['jshint', 'concat:javascript'],
      }
		},
		// Empty out CSS and JS directories so they are clean for Grunt to compile correct files
		clean: {
			preBuild: ['assets/css', 'assets/js/*.js'],
			postBuild: ['<%= jst.compile.dest %>']
		},
		// Optimise images for production environment
		imagemin: {
			production: {
				options: {
					optimizationLevel: 5
				},
				files: [{
					expand: true,
					cwd: 'assets/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/img'
				}]
			}
		},
		// Compass task to compile Sass using the Compass mixin library
		// Compass settings are stored in src/config.rb
		compass: {
			development: {
				options: {
					environment: 'development',
					config: 'src/config.rb'
				}
			},
			production: {
				options: {
					environment: 'production',
					config: 'src/config.rb'
				}
			}
		},
		// JavaScript Template compiler - save all templates as one file and allow them to be acccess as objects
		jst: {
			compile: {
				options: {
					namespace: 'templates',
					prettify: false,
					amdWrapper: false,
					processName: function(filename) {
            // Shortens the file path for the template and removes file extension.
            return filename.slice(filename.indexOf('templates') + 10, filename.length).replace(/\.[^/.]+$/, '');
					}
				},
        src: ['src/js/tpl/*.tpl'],
        dest: 'src/js/templates.js'
			}
		},
    // JSHint JS files to flush out any errors
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          // ignore templates
          '<%= jst.compile.dest %>',
          'src/js/plugins/*'
        ]
      },
      files: [
        'Gruntfile.js',
        'src/js/**/*.js'
      ]
    },
		// Concatinate all the JavaScript files to reduce amount of requests
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			javascript: {
				// the files to concatenate
				src: [
          'src/js/plugins/*.js',
          'src/js/app.js',
          'src/js/helpers.js',
          'src/js/mod/*.js',
          'src/js/main.js'
        ],
				// the location of the resulting JS file
				dest: 'assets/js/app.js'
			}
		},
		// Minify JavaScript files to reduce page weight
		// Only used for production environment
		uglify: {
			options: {

			},
			javascript: {
				files: {
					'assets/js/app.min.js': ['<%= concat.javascript.dest %>']
				}
			}
		}
	});

	// Default task(s).
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build-dev', [
		'clean:build',
		'compass:development',
    'jshint',
    'jst',
		'concat:javascript',
		'uglify:javascript',
		'imagemin:production'
	]);

	grunt.registerTask('build', [
		'clean:preBuild',
		'compass:production',
    'jshint',
		'jst',
		'concat:javascript',
		'uglify:javascript',
		'imagemin:production',
		'clean:postBuild'
	]);
};