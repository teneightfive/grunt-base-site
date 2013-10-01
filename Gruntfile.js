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
				tasks: ['jst', 'concat:javascript'],
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
		jst: {
			compile: {
				options: {
					namespace: "sant",
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
					"build-files/js/templates.js": ["build-files/js/templates/*.tpl"]
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
	grunt.loadNpmTasks('grunt-contrib-jst');
	
	// Default task(s).
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build-dev', ['clean:build', 'compass:development', 'jst', 'concat:javascript', 'uglify:javascript', 'imagemin:production']);
	grunt.registerTask('build', ['clean:build', 'compass:production', 'jst', 'concat:javascript', 'uglify:javascript', 'imagemin:production']);

};