# Photon Event Store

Photon is an event store with cold+hot event streaming.

## Prerequisites

You will need [Leiningen][] 2.0.0 or above installed.

[leiningen]: https://github.com/technomancy/leiningen

## Muon schemas

The endpoints and expected schemas to interact with `photon` can be found
[here](docs/schemas.md).

## Create config file

create file resources/config.properties with your environment settings:

```
# Microservice identifier:
microservice.name=photon
# AMQP endpoint:
amqp.url=amqp://username:password@localhost
# Number of cores assigned for parallel stream processing:
# (Default = number of cores on your machine)
parallel.projections=8
# Local folder with projections, in EDN format, to pre-load on start:
# (Optional)
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

## Running

To start a web server for the application, run:

    lein cljsbuild once

    lein run



## Admin Console

     Browse to http://localhost:3000/index.html



## Testing

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

## License

Copyright © 2015 FIXME
