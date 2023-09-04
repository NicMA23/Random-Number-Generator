const { task } = require("grunt")

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Compilar main.less --> main.css e comprimir main.less --> main.min.css
        less: {
            development: {
                files: {
                    './dev/styles/main.css': './src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    './dist/styles/main.min.css': './src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['./src/styles/**/*.less'],
                tasks: ['less:development']
            },
            //Observar o html para mudanças e, se houver, rodar o raplace:dev
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        //Ajustar index.html para dev e dist
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        //src/index.html vai com ./styles/main.css para o dev/
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        // prebuild/index.html vai comprimido junto com ./styles/main.min.css para o dist/
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        //Comprimir index.html
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        //Comprimir main.js
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        },
        //Dentro do array vai a pasta que queremos deletar
        clean: ['prebuild']
    })

    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-replace')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-uglify')

    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'uglify', 'clean'])
}
