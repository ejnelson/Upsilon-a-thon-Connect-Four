var sources = [ "public/scripts/*.js", "!public/scripts/client.min.js" ];

module.exports = function(grunt) {
  grunt.initConfig({
    uglify: { dist: { src: sources, dest: "public/scripts/client.min.js" } },
    clean: [ "public/scripts/client.min.js", "public/vendors/*" ],
    watch: { files: sources, tasks: [ "default" ] },
    copy: {
      files: {
        src: [
          "node_modules/alertifyjs/build/alertify.min.js",
          "node_modules/alertifyjs/build/css/alertify.min.css",
          "node_modules/alertifyjs/build/css/themes/semantic.min.css",
          "node_modules/angular/angular.min.js",
          "node_modules/angular-route/angular-route.min.js",
          "node_modules/angular-animate/angular-animate.min.js",
          "node_modules/angular-route/angular-touch.min.js",
          "node_modules/ng-file-upload/dist/ng-file-upload.min.js",
          "node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js"
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
