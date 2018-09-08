#!/bin/bash

NODE_ENV=production yarn --silent webpack --silent
pushd dist
python3 -m http.server 8888 &
PID=$!

until $(curl -Ifs -o /dev/null http://localhost:8888)
  do sleep 1;
done

yarn lighthouse http://localhost:8888 \
  --quiet \
  --chrome-flags="--headless" \
  --output-path=/tmp/lighthouse.html \
  --view

kill -9 $PID
