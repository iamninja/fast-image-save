#!/usr/bin/env bash

if [[ ! -e data/bower_components ]]; then
  echo "Run 'bower install' first." >&2
  exit 1
fi

# Make directories
mkdir -p data/js
mkdir -p data/stylesheets
mkdir -p data/fonts

# Copy dist files
if [[ -e data/bower_components/jquery/dist/jquery.min.js ]]; then
  cp -v data/bower_components/jquery/dist/jquery.min.js data/js/jquery.min.js
else
  echo "Run 'bower install materialize' first." >&2
  exit 1
fi

if [[ -e data/bower_components/materialize/dist/js/materialize.min.js ]]; then
  cp -v data/bower_components/materialize/dist/js/materialize.min.js data/js/materialize.min.js
else
  echo "Run 'bower install materialize' first." >&2
  exit 1
fi

if [[ -e data/bower_components/materialize/dist/css/materialize.min.css ]]; then
  cp -v data/bower_components/materialize/dist/css/materialize.min.css data/stylesheets/materialize.min.css
else
  echo "Run 'bower install materialize' first." >&2
  exit 1
fi

if [[ -e data/bower_components/materialize/dist/fonts/roboto ]]; then
  cp -vr data/bower_components/materialize/dist/fonts/roboto data/fonts/roboto
else
  echo "Run 'bower install materialize' first." >&2
  exit 1
fi

if [[ -e data/bower_components/material-design-icons/iconfont ]]; then
  cp -vr data/bower_components/material-design-icons/iconfont data/fonts/iconfont
else
  echo "Run 'bower install material-design-icons' first." >&2
  exit 1
fi

echo "Finished copying bower libraries." >&1
exit 0
