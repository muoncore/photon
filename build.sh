#!/usr/bin/env bash

export LEIN_VERSION=2.5.1
export LEIN_INSTALL=./leinbin/
echo $LEIN_INSTALL
# Download the whole repo as an archive
mkdir -p $LEIN_INSTALL \

wget --quiet https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein

mv lein $LEIN_INSTALL/lein \

chmod 0755 $LEIN_INSTALL/lein \
# Download and verify Lein stand-alone jar

export PATH=$LEIN_INSTALL:$PATH
export LEIN_ROOT=1
echo $PATH

which lein
lein cljsbuild once
lein deps

mv "$(lein uberjar | sed -n 's/^Created \(.*standalone\.jar\)/\1/p')" app-standalone.jar
