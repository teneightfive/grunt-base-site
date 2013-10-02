module.exports = function(grunt) {
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Create watch task to watch Sass and JS directories during Dev
		watch: {
			css: {
				files: ['src/scss/*.scss', 'src/scss/**/*.scss'],
				tasks: ['compass:development'],
			},
			js: {
				files: ['src/js/**'],
				tasks: ['jst', 'concat:javascript'],
			}
		},
		// Empty out CSS and JS directories so they are clean for Grunt to compile correct files
		clean: {
			build: ['assets/css', 'assets/js/*.js']
		},
		// Optimise images for production environment
		imagemin: {
			production: {
				options: {
					optimizationLevel: 5
				},
				files: {
					'assets/img/**' : 'assets/img/**'
				}
			}
		},
		// Compass task to compile Sass using the Compass mixin library
		// Compass settings are stored in src/config.rb
		compass: {
			development: {
				options: {
					//basePath: 'src/scss/',
					environment: 'development',
					config: 'src/config.rb'
				}
			},
			production: {
				options: {
					//basePath: 'src/scss/',
					environment: 'production',
					config: 'src/config.rb'
				}
			}
		},
		// JavaScript Template compiler - save all templates as one file and allow them to be acccess as objects
		jst: {
			compile: {
				options: {
					namespace: "templates",
					prettify: false,
		            amdWrapper: false,
		            templateSettings: {
		            },
		            processName: function(filename) {
		                //Shortens the file path for the template.
		                return filename.slice(filename.indexOf("templates")+10, filename.length);
		            }
				},
				files: {
					"src/js/templates.js": ["src/js/template/*.tpl"]
				}
			}
		},
		// Concatinate all the JavaScript files to reduce amount of requests
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			javascript: {
				// the files to concatenate
				src: ['src/js/plugin/*.js', 'src/js/cpt/*.js', 'src/*.js'],
				// the location of the resulting JS file
				dest: 'assets/js/application.js'
			}
		},
		// Minify JavaScript files to reduce page weight
		// Only used for production environment
		uglify: {
			options: {
				
			},
			javascript: {
				files: {
					'assets/js/application.min.js': ['<%= concat.javascript.dest %>']
				}
			}
		}
	});
	
	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jst');
	
	// Default task(s).
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build-dev', ['clean:build', 'compass:development', 'jst', 'concat:javascript', 'uglify:javascript', 'imagemin:production']);
	grunt.registerTask('build', ['clean:build', 'compass:production', 'jst', 'concat:javascript', 'uglify:javascript', 'imagemin:production']);

};