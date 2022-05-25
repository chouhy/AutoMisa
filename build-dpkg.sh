#!/usr/bin/env bash

pkg=blockfish-visualizer
ver=${1:-99.99.99}
rev=${2:-0}

echo "version: ${ver}"
echo "revision: ${rev}"

set -ex

cd blockfish/blockfish-js
npm install .
npm run build
rm -rf node_modules
cd ../..

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

mkdir -p "${root}/usr/lib/systemd/system"
install -m 644 blockfish-visualizer.service "${root}/usr/lib/systemd/system"

mkdir -p "${lib}/src"
cp package.json "${lib}"
cp main.js "${lib}"
cp -r src/app "${lib}/src/app"
cp -rL node_modules "${lib}/node_modules"

mkdir -p "${root}/DEBIAN"
readonly ctl="${root}/DEBIAN/control"
echo "Package: ${pkg}" > ${ctl}
echo "Version: ${ver}" >> ${ctl}
echo "Maintainer: iitalics" >> ${ctl}
echo "Architecture: all" >> ${ctl}
echo "Depends: blockfish, nodejs" >> ${ctl}
echo "Description: blockfish visualizer" >> ${ctl}

mkdir -p dist
dpkg-deb --root-owner-group -b "${root}" "dist/${pkg}-${ver}-${rev}_all.deb"

exit 0
