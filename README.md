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
db.backend={file,mongodb,riak}
microservice.name=photon
file.path=/path/to/file.json
amqp.url=amqp://username:password@localhost
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

create a test photon client to interact with photon event store:

lein new muon-clojure photon-test-client

## License

Copyright © 2015 FIXME
