FROM java:openjdk-8u45-jdk
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get update && apt-get install -y mongodb-org
RUN mkdir -p /data/db
RUN /usr/bin/mongod
ENV LEIN_VERSION 2.5.1
ENV LEIN_INSTALL /usr/local/bin/
RUN echo $LEIN_INSTALL
RUN echo ${LEIN_INSTALL}
# Download the whole repo as an archive
RUN mkdir -p $LEIN_INSTALL \
&& wget --quiet https://github.com/technomancy/leiningen/archive/$LEIN_VERSION.tar.gz \
&& echo "Comparing archive checksum ..." \
&& echo "4f6e2e189be0a163f400c3a8060896285fe731f7 *$LEIN_VERSION.tar.gz" | sha1sum -c - \
&& mkdir ./leiningen \
&& tar -xzf $LEIN_VERSION.tar.gz -C ./leiningen/ --strip-components=1 \
&& mv leiningen/bin/lein-pkg $LEIN_INSTALL/lein \
&& rm -rf $LEIN_VERSION.tar.gz ./leiningen \
&& chmod 0755 $LEIN_INSTALL/lein \
# Download and verify Lein stand-alone jar
&& wget --quiet https://github.com/technomancy/leiningen/releases/download/$LEIN_VERSION/leiningen-$LEIN_VERSION-standalone.zip \
&& wget --quiet https://github.com/technomancy/leiningen/releases/download/$LEIN_VERSION/leiningen-$LEIN_VERSION-standalone.zip.asc \
&& gpg --keyserver pool.sks-keyservers.net --recv-keys 296F37E451F91ED1783E402792893DA43FC33005 \
&& echo "Verifying Jar file signature ..." \
&& gpg --verify leiningen-$LEIN_VERSION-standalone.zip.asc \
# Put the jar where lein script expects
&& rm leiningen-$LEIN_VERSION-standalone.zip.asc \
&& mv leiningen-$LEIN_VERSION-standalone.zip /usr/share/java/leiningen-$LEIN_VERSION-standalone.jar
ENV PATH $PATH:$LEIN_INSTALL
ENV LEIN_ROOT 1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY project.clj /usr/src/app/
RUN lein deps
COPY . /usr/src/app
RUN mv "$(lein uberjar | sed -n 's/^Created \(.*standalone\.jar\)/\1/p')" app-standalone.jar
ENTRYPOINT ["java"]
CMD ["-jar", "app-standalone.jar"]
