#!/usr/bin/env bash

rm -rf node_modules
npm install .
npm run build
rm -rf node_modules
npm install . --production


readonly tmp=$(mktemp -d)
readonly root="${tmp}/${pkg}-${ver}-${rev}_all"
readonly www="${root}/usr/share/blockfish-visualizer/www"

mkdir -p "${www}"
install -m 644 static/index.html "${www}"
install -m 644 static/style.css "${www}"
install -m 644 static/client.js "${www}"

exit 0
