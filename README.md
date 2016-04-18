# Photon Event Store

Photon is an event store with cold+hot event streaming.

In microservices, each service is supposed to take responsibility for a single functional capability: a computational process. In this context, these processes will follow the same pattern: gathering sequences of inputs and generating sequences of outputs though transformation functions, also called projections. Usually such functions are deeply coupled with both 1) the implementation of the service and 2) the data consumed to generate a current state and outputs. As a consequence, designs and implementations of the concepts of storage, sequence handling and data transformation have to be repeated over and over again across different services.

Photon is an attempt at avoiding such redundancy by abstracting and encapsulating both the storage and the transformation of data as service methods. It is designed as a black box with an internal database with a projection engine, both generic enough to store free-form data and allow for a wide range of expressivity for data transformation, in real time. In this way, business rules can be implemented and deployed in Photon instances via projections, effectively decoupling business logic and data storage and processing.

## Prerequisites

You will need [Leiningen][] 2.0.0 or above installed.

[leiningen]: https://github.com/technomancy/leiningen

## Running

You can run photon directly from the source:

```
lein do cljsbuild once, run
```

Or you can build an uberjar:

```
lein do cljsbuild once, uberjar
java -jar photon-*-standalone.jar
```

## Admin Console

Once running, point your browser to: `http[s]://HOST:PORT/index.html`. HOST and PORT can be configured as seen below.

### Startup options

```
Usage: java -jar photon-x.x.x-standalone.jar [-h] [-option value] ... [-option value]
Options:
-microservice.name    : Service ID, especially important for Muon (default = photon)
-rest.host            : The IP or hostname of the web server for frontend and API. Change it for external access (default = localhost)
-rest.port            : The port for the UI frontend and the REST API
-rest.keystore        : If set, the web server will be started in SSL mode using the certificates identified by this path
-rest.keypass         : The password required to open the keystore set in rest.keystore. Not required in not-SSL mode
-admin.user           : The default username for logging in and requesting API tokens (default = admin)
-admin.pass           : The default password for logging in and requesting API tokens (default = p4010n)
-admin.secret         : A secret string that will be used to encode authentication tokens (default is random on launch)
-projections.port     : Port to stream projection updates to (default = 8375)
-events.port          : Port to stream incoming events to (default = 8376)
-amqp.url             : AMQP endpoint (default = amqp://localhost)
-parallel.projections : Number of cores assigned for parallel stream processing (default = number of cores on your machine)
-projections.path     : Local folder with projections, in EDN format, to pre-load on start (default = /tmp/photon)
-db.backend           : DB backend plugin to use (default=h2). Depending on the build of photon, this can be one of:
                        h2, cassandra, redis, file, mongo, riak, dummy.
-h2.path              : If using H2, the file prefix for the database file, including path (default = /tmp/photon.h2)
-cassandra.ip         : If using Cassandra, the host of the cluster
-file.path            : If using files as backend, the absolute path to the file
-mongodb.host         : If using MongoDB, the host of the cluster
-riak.default_bucket  : If using Riak, the name of the bucket
-riak.node.X          : If using Riak, the nodes that form the cluster (riak.node.1, riak.node.2, etc.)
```

## Setting up a file for static configuration

Photon can be configured either directly from the command line or from a file, and parameters can be combined from different sources. The order of priority in which the configuration is build is the following:

1. Command-line arguments
2. photon.properties in the working directory
3. resources/photon.properties
4. resources/config.properties

Example of property file:

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

## Muon schemas

The endpoints and expected schemas to interact with `photon` can be found [here](docs/schemas.md).

## Testing

Tests are run by executing

```
lein midje
```

To run the test suite from the REPL:

```bash
lein repl
=> (use 'midje.sweet)
=> (autotest)
```

Alternatively, create a test photon client to interact with photon:

```bash
lein new muon-clojure photon-test-client
```

## Profiling

In order to achieve the best performance and thoughput, photon has been intensively tested and profiled with the [YourKit](https://www.yourkit.com) profiler, with a license kindly provided by their creators as part of their support to the open source community.

![YourKit logo](https://www.yourkit.com/images/yklogo.png)

YourKit supports open source projects with its full-featured Java Profiler.
YourKit, LLC is the creator of <a href="https://www.yourkit.com/java/profiler/index.jsp">YourKit Java Profiler</a>
and <a href="https://www.yourkit.com/.net/profiler/index.jsp">YourKit .NET Profiler</a>,
innovative and intelligent tools for profiling Java and .NET applications.

## License

Copyright 2015, The authors.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
