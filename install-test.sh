#!/bin/bash

set -e

npm -s link

mkdir -p my-new-project
pushd my-new-project

rak
npm test

popd
rm -rf my-new-project
