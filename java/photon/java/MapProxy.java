package photon.java;

import clojure.lang.APersistentMap;
import clojure.lang.Keyword;

import java.io.Serializable;

public class MapProxy implements Serializable {
    private static final long serialVersionUID = 8736376123503546666L;

    private APersistentMap m;
    private final static Keyword kOrderId = Keyword.intern(null, "order-id");
    private final static Keyword kStreamName = Keyword.intern(null, "stream-name");
    private final static Keyword kServerTimestamp = Keyword.intern(null, "server-timestamp");
    
    public MapProxy(APersistentMap m) {
	this.m = m;
    }

    public String getStreamName() {
	return (String) m.get(kStreamName);
    }

    public long getOrderId() {
	return (long) m.get(kOrderId);
    }

    public long getServerTimestamp() {
	return (long) m.get(kServerTimestamp);
    }

    public APersistentMap getMap() {
	return m;
    }
}

