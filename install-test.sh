#!/bin/bash

set -e

npx yalc publish

mkdir -p my-new-project
pushd my-new-project

yarn init -y
npx yalc add rak
node node_modules/rak/install.js
yarn run test

diff yarn.lock ../yarn.lock

popd
rm -rf my-new-project
