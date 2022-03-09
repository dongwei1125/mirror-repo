#! /bin/bash

set -e

SRC_REPO=$1
DIST_REPO=$2

mkdir _temp && cd _temp

git clone --mirror "$SRC_REPO" && cd `basename "$SRC_REPO"`

git remote set-url --push origin "$DIST_REPO"

git push --mirror

cd ../../ && rm -rf _temp