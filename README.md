
## Dependencies

* Java JDK (preferably 8)
* [Leiningen][] (2.0.0 or greater)
* RabbitMQ, either remote or local

## Other database backends

This configuration assumes you're using a local file, but other database backends are available
* cassandradb
* riak

## Muon schemas

The endpoints and expected schemas to interact with `photon` can be found
[here](docs/schemas.md).

## Installation

### Install java JDK 8
```bash
$ wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u65-b17/jdk-8u65-linux-x64.tar.gz
```
#### The Debian Way

This installs a lot of dependencies and isn't recommended for a production environment. It is, however, essentially foolproof on debian. Useful for testing things.

sudo apt-get install libgl1-mesa-glx libxslt1.1 libxtst6 libxxf86vm1

install java-package and follow the instructions here

https://wiki.debian.org/JavaPackage

#### The General Way (aka the clean way)

untar jdk-8u65-linux-x64.tar.gz to /opt
symlink /opt/jdk-1.8<.ver> to /opt/java
Edit /etc/profile (or add a file in /etc/profile.d) to contain the following

```
JAVA_HOME=/opt/java
PATH="$PATH:/opt/java/bin"
```

### Install Leiningen

See the guide here: https://github.com/technomancy/leiningen/tree/stable

### Install Photon

```bash
$ mkdir photon
$ cd photon 
$ git clone https://github.com/microserviceux/photon.git .
```
create photon/resources/config.properties. The following is a minimal config that runs entirely locally.

```
db.backend=file
microservice.name=photon
file.path=/muon/photon/data_base.json
amqp.url=amqp://localhost
```

Build and run.

```bash
$ ./build.sh
$ lein cljsbuild once
$ lein run
```

## Admin Console

     Browse to http://localhost:3000/index.html


## Testing

To run the test suite:

```bash
lein repl
=> (use 'midje.sweet)
=> (autotest)
```


Alternatively, create a test photon client to interact with photon event store:

```bash
lein new muon-clojure photon-test-client
```

## All Config Options

```
# Microservice identifier (default = photon):
microservice.name=photon
# AMQP endpoint (default = amqp://localhost):
amqp.url=amqp://username:password@localhost
# Number of cores assigned for parallel stream processing
# (default = number of cores on your machine):
parallel.projections=8
# Local folder with projections, in EDN format, to pre-load on start
# (default = /tmp/photon):
file.path=/path/to/edn-files/
# DB backend plugin to use, several options currently available:
db.backend={file,mongodb,riak,cassandra}
# Depending on the backend, you'll need to set up the DB plugin:
cassandra.ip=127.0.0.1
file.path=/path/to/file.json
mongodb.host=localhost
riak.default_bucket=photon-eventstore-v1
riak.node.1=riak1.yourdomain.com
riak.node.2=riak2.yourdomain.com
riak.node.3=riak3.yourdomain.com
```


## License

Copyright 2015 Simplicity Itself Ltd.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
