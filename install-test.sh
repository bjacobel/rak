#!/bin/bash

set -e

command -v yalc >/dev/null 2>&1 || yarn global add yalc || npm install -g yalc
yalc publish

mkdir -p my-new-project
pushd my-new-project

yarn init -y
yalc add rak
node node_modules/rak/install.js
yarn run test

popd
rm -rf my-new-project
