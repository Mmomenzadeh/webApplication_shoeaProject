"use strict";
const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
function compileSass(done) {
  src("assets/styles/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("assets/styles/css"));
  done();
}

function watchSass() {
  watch("assets/styles/scss/*.scss", compileSass);
}

exports.watchSass = watchSass;
