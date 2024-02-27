#!/usr/bin/env bash

pkg=blockfish-visualizer
ver=${1:-99.99.99}
rev=${2:-0}

echo "version: ${ver}"
echo "revision: ${rev}"

set -ex

rm -rf node_modules
npm install .
npm run build
rm -rf node_modules
npm install . --production

tmp=

function cleanup {
    set +e
    rm -rf "${tmp}"
}

trap cleanup EXIT

readonly tmp=$(mktemp -d)
readonly root="${tmp}/${pkg}-${ver}-${rev}_all"
readonly lib="${root}/usr/lib/node_modules/blockfish-visualizer"
readonly www="${root}/usr/share/blockfish-visualizer/www"

mkdir -p "${www}"
install -m 644 static/index.html "${www}"
install -m 644 static/style.css "${www}"
install -m 644 static/client.js "${www}"

exit 0
