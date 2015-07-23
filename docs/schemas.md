# photon schemas

## Event management

### Posting events

* Method: `command`
* Endpoint: `/events`
* Required parameters:
  * `service-id`
  * `local-id`
  * `server-timestamp`
  * `stream-name`
  * `payload`

* Body:

```json
{"service-id" : "muon://origin",
 "local-id" : "any-uuid",
 "server-timestamp" : 1437646327886,
 "provenance" : {"service-id" : "muon://some-service",
                 "local-id" : "some-uuid",
                 "relationship-type" : "caused-by"},
 "schema-url" : "http://some.url/some.schema.json",
 "stream-name" : "target-stream",
 "payload" : {"any" : "object"}}
```

* Response:

```json
{"correct" : "true"}
```

## Projection management

### Posting a projection

* Method: `command`
* Endpoint: `/projections`
* Required parameters:
  * `projection-name`
  * `language`
  * `code`
  * `initial-value`

* Body:

```json
{"projection-name" : "any-name",
 "stream-name" : "any-stream or __all__",
 "language" : "javascript or clojure",
 "reduction" : "(fn [prev next] ...) or function(prev,next) {... return x;}",
 "initial-value" : value_of_first_prev}
```

* Response:

```json
"Ok"
```

### Querying active projections

* Method: `query`
* Endpoint: `/projection-keys`
* Required parameters: none

* Body:

```json
{}
```

* Response:

```json
{"projection-keys" : ["projection-1", "projection-2"]}
```

### Querying a specific projection

* Method: `query`
* Endpoint: `/projection`
* Required parameters:
  * `projection-name`

* Body:

```json
{"projection-name" : "any-projection-key"}
```

* Response:

```json
{"fn" : "projection-code",
 "last-error" : null, //null or exception message
 "current-value" : {}, // the last computed value of the reduction
 "avg-time" : 0.0, // Average milliseconds spent per event processed
 "status" : "running or failed",
 "language" : "javascript or clojure",
 "processed" : 0, // Number of events processed so far
 "last-event" : {}, // Last event processed
 "stream-name" : "stream or __all__",
 "projection-name" : "name"}
```

## Streaming

### Subscribe to a stream

* Method: `stream-source`
* Endpoint: `/stream`
* Required parameters: none

* Body:

```json
{"stream-name" : "__all__ or a stream-name",
 "from" : 0, // Lower bound in milliseconds, default 0
 "stream-type" : "hot or cold or hot-cold, default is hot"}
```




