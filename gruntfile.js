var sources = [ "public/scripts/*.js", "!public/scripts/client.min.js" ];

module.exports = function(grunt) {
  grunt.initConfig({
    uglify: { dist: { src: sources, dest: "public/scripts/client.min.js" } },
    clean: [ "public/scripts/client.min.js", "public/vendors/*" ],
    watch: { files: sources, tasks: [ "default" ] },
    copy: {
      files: {
        src: [
          "node_modules/angular/angular.min.js",
          "node_modules/angular-route/angular-route.min.js",
          "node_modules/angular-animate/angular-animate.min.js"
        ],
        dest: "public/vendors/",
        expand: true,
        flatten: true
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("default", [ "clean", "uglify", "copy" ]);
};
