#!/usr/bin/env bash

export LEIN_VERSION=2.5.1
export LEIN_INSTALL=./lein/
echo $LEIN_INSTALL
echo ${LEIN_INSTALL}
# Download the whole repo as an archive
mkdir -p $LEIN_INSTALL \

wget --quiet https://github.com/technomancy/leiningen/archive/$LEIN_VERSION.tar.gz \

echo "Comparing archive checksum ..." \

echo "4f6e2e189be0a163f400c3a8060896285fe731f7 *$LEIN_VERSION.tar.gz" | sha1sum -c - \

mkdir ./leiningen \

tar -xzf $LEIN_VERSION.tar.gz -C ./leiningen/ --strip-components=1 \

mv leiningen/bin/lein-pkg $LEIN_INSTALL/lein \

rm -rf $LEIN_VERSION.tar.gz ./leiningen \

chmod 0755 $LEIN_INSTALL/lein \
# Download and verify Lein stand-alone jar

wget --quiet https://github.com/technomancy/leiningen/releases/download/$LEIN_VERSION/leiningen-$LEIN_VERSION-standalone.zip \

wget --quiet https://github.com/technomancy/leiningen/releases/download/$LEIN_VERSION/leiningen-$LEIN_VERSION-standalone.zip.asc \

gpg --keyserver pool.sks-keyservers.net --recv-keys 296F37E451F91ED1783E402792893DA43FC33005 \

echo "Verifying Jar file signature ..." \

gpg --verify leiningen-$LEIN_VERSION-standalone.zip.asc \
# Put the jar where lein script expects

rm leiningen-$LEIN_VERSION-standalone.zip.asc \

mv leiningen-$LEIN_VERSION-standalone.zip $LEIN_INSTALL/leiningen-$LEIN_VERSION-standalone.jar
export PATH=$PATH:$LEIN_INSTALL
export LEIN_ROOT=1

lein deps

mv "$(lein uberjar | sed -n 's/^Created \(.*standalone\.jar\)/\1/p')" app-standalone.jar
