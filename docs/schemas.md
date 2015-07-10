# photon schemas

## Event

```clojure
{:service-id ^String
 :local-id ^String
 :server-timestamp ^Long
 :provenance {:service-id ^String
              :local-id ^String
              :relationship-type ^String}
 :schema-url ^String
 :stream-name ^String
 :payload ^Map}
```

## Projection

### Subscription

{:projection-name ^String
 :stream-name ^String
 :language ^String
 :initial-value ^Any
 :filter ^String
 :reduction ^String}

### Current value

{:projection-name ^String
 :processed ^Integer
 :last-event ^Map
 :current-status ^[:running :paused :failed]
 :last-exception
 :current-value}


