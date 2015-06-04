package io;


import config.PropsLoader;
import org.json.JSONObject;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;



/**
 * Created by gawain on 15/05/2015.
 */
public class Events {

    private static Properties props;
    private static Riak riak;

    public static void main(String[] args) {
        String bucketName = getProperty("riak.bucket.name");
        System.out.println("bucket name: " + bucketName);
        String bucketType = getProperty("riak.bucket.type");
        System.out.println("bucket type: " + bucketType);


        String id = persist("asap", "new_user", "{'name': 'bob'}");
        JSONObject result = get(id);
        System.out.println("bucket name: " + bucketName);
        assert result != null;
    }

    private static Properties getProperties() {

        if (props != null) return props;

        String result = "";
        props = PropsLoader.getProperties("config.properties");
        return props;
    }

    private static String getProperty(String propertyName) {
        return getProperties().getProperty(propertyName);
    }

    private static Riak getRiak() {
        if (riak != null) return riak;

        String bucketName = getProperty("riak.bucket.name");
        String bucketType = getProperty("riak.bucket.type");
        String[] riakNodes = getProperty("riak.nodes").split(",");
        riak = new Riak(bucketName, bucketType, riakNodes);
        return riak;

    }

    public static String persist(String streamName, String eventName, String payload) {
        return getRiak().persist(streamName, eventName, payload);
    }


    public static JSONObject get(String id) {
        return getRiak().getEvent(id);
    }

    public static  List<Map<String, List<String>>>  since(String stream, long date, int pageNum) {
        return getRiak().eventsSince(date, stream, pageNum);
    }

}
