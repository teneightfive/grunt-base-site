# Require any additional compass plugins here. eg:
# require 'susy'
# require 'foundation'

# Set this to the root of your project when deployed:
http_path = "/"
project_path = "./"

# css
css_dir = "css"
css_path = project_path + "assets/" + css_dir
# sass
sass_dir = "scss"
sass_path = project_path + "src/" + sass_dir
# images
images_dir = "img"
images_path = project_path + "assets/" + images_dir
# javascript
javascripts_dir = "js"
javascripts_path = project_path + "assets/" + javascripts_dir
# fonts
fonts_dir = "fonts"
fonts_path = project_path + "assets/" + fonts_dir

# output_style options - :compressed, :nested, :expanded, :compact
output_style = (environment == :production) ? :compressed : :expanded

# line comments
line_comments = (environment == :production) ? false : true