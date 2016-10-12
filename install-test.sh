#!/bin/bash

set -e

mkdir -p my-new-project
pushd my-new-project

yarn add file:../
$(yarn bin)/rak
yarn run test

popd
rm -rf my-new-project
