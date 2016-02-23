# photon schemas

## Message format

```clojure
{:sender "muon://foo"
 :receiver "muon://photon"
 :uuid "0d35c44f-89a7-4abd-b4ce-e313aaa75c37"
 :in-reply-to "c0687d0c-9219-45fe-9990-fa12e2f95736"
 :server-timestamp 1437646327886
 :schema "http://cistechfutures.net/foo.schema"
 :protocol "fire-and-forget"
 :encoding "application/json"
 :payload "{\"this\": \"is\", \"a\": \"payload\"}”}
```

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

```javascript
{"service-id" : "muon://origin",
 "local-id" : "any-uuid",
 "server-timestamp" : 1437646327886,
 "provenance" : {"service-id" : "muon://some-service",
                 "local-id" : "some-uuid",
                 "relationship-type" : "caused-by"},
 "encoding" : "application/json",
 "schema" : "http://some.url/some.schema.javascript",
 "stream-name" : "target-stream",
 "payload" : {"any" : "object"}}
```

* Response:

```javascript
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

```javascript
{"projection-name" : "any-name",
 "stream-name" : "any-stream or __all__",
 "language" : "javascript or clojure",
 "reduction" : "(fn [prev next] ...) or function(prev,next) {... return x;}",
 "initial-value" : "value_of_first_prev"}
```

* Response:

```javascript
{"correct" : "true"}
```

### Querying active projections

* Method: `query`
* Endpoint: `/projection-keys`
* Required parameters: none

* Body:

```javascript
{}
```

* Response:

```javascript
{"projection-keys" : ["projection-1", "projection-2"]}
```

### Querying a specific projection

* Method: `query`
* Endpoint: `/projection`
* Required parameters:
  * `projection-name`

* Body:

```javascript
{"projection-name" : "any-projection-key"}
```

* Response:

```javascript
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

```javascript
{"stream-name" : "__all__ or a stream-name",
 "from" : 0, // Lower bound in milliseconds, default 0
 "stream-type" : "hot or cold or hot-cold, default is hot"}
```




