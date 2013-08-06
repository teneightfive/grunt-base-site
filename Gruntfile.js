module.exports = function(grunt) {
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			css: {
				files: ['build-files/scss/*.scss', 'build-files/scss/**/*.scss'],
				tasks: ['compass:development'],
			},
			js: {
				files: ['build-files/js/**'],
				tasks: ['concat:javascript'],
			}
		},
		clean: {
			build: ['assets/css', 'assets/js/*.js']
		},
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
		compass: {
			development: {
				options: {
					//basePath: 'build-files/scss/',
					environment: 'development',
					config: 'build-files/config.rb'
				}
			},
			production: {
				options: {
					//basePath: 'build-files/scss/',
					environment: 'production',
					config: 'build-files/config.rb'
				}
			}
		},
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			javascript: {
				// the files to concatenate
				src: ['build-files/js/plugins/*.js', 'build-files/js/cpts/*.js', 'build-files/*.js'],
				// the location of the resulting JS file
				dest: 'assets/js/application.js'
			}
		},
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
	
	// Default task(s).
	grunt.registerTask('default', ['watch']);
	//grunt.registerTask('watch', ['watch']);
	grunt.registerTask('build', ['clean:build', 'compass:production', 'concat:javascript', 'uglify:javascript', 'imagemin:production']);

};