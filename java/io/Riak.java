package io;

import com.basho.riak.client.api.RiakClient;
import com.basho.riak.client.api.commands.kv.FetchValue;
import com.basho.riak.client.api.commands.kv.StoreValue;
import com.basho.riak.client.core.RiakCluster;
import com.basho.riak.client.core.RiakNode;
import com.basho.riak.client.core.operations.SearchOperation;
import com.basho.riak.client.core.query.Location;
import com.basho.riak.client.core.query.Namespace;
import com.basho.riak.client.core.query.RiakObject;
import com.basho.riak.client.core.util.BinaryValue;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * Created by gawain on 11/05/2015.
 *
 * You can run a etst serach using curl on the riak database like so:
 *
 *
 * curl -X GET 'http://riak1.cistechfutures.net:8098/search/query/eventstore?wt=json&q=stream_s:cambio&q=created_dt:%5B2015-05-14T10:00:00Z%20TO%20*%5D'  | json_pp
 *
 */
public class Riak {

    private final String bucketName;
    private final String bucketType;
    private final RiakCluster cluster;
    private final RiakClient client;
    private final Namespace namespace;

    public Riak(String bucketName, String bucketType, String[] riakNodes) {
        this.bucketName = bucketName;
        this.bucketType = bucketType;

        RiakNode.Builder builder = new RiakNode.Builder();
        builder.withMinConnections(10);
        builder.withMaxConnections(50);

        List<String> addresses = new LinkedList<String>();

        for (String  riakNode : riakNodes) {
            addresses.add(riakNode);

        }

        try {
            List<RiakNode> nodes = RiakNode.Builder.buildNodes(builder, addresses);
            cluster = new RiakCluster.Builder(nodes).build();
        } catch (Exception e) {
            throw new RuntimeException("Error while creating riak cluster connection", e);
        }

        cluster.start();
        client = new RiakClient(cluster);

        namespace = new Namespace(bucketType, bucketName);
        System.out.println("io.Riak connection initiated bucket type=" + namespace.getBucketType() + " bucket=" + namespace.getBucketName());

    }


    /**
     * This is a pikey test
     *
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {

        String[] nodes = {"riak1.cistechfutures.net", "riak2.cistechfutures.net", "riak3.cistechfutures.net"};
        Riak riak = new Riak("rxriak-events-v1", "eventstore", nodes);

        String id = riak.persist("cambio", "create-user", "{'username': 'gawain hammond', 'uid': 'gah08', 'job_title': 'Software Developer'}");
        JSONObject event = riak.getEvent(id);
        System.out.println("\nReturned Event: " + event);
        List<Map<String, List<String>>> results = riak.eventsSince(riak.toDate("2015-05-14T10:00:00Z"), "cambio", 1);

        for (Map result: results) {
            System.out.println(result);
        }
        //Object eventsAfter = riak.eventsAfter(null);
        riak.cluster.shutdown();

    }



    public String persist(String streamName, String eventName, String payload) throws RuntimeException {

        RxEvent event = new RxEvent(streamName, eventName, payload);
        Location location = new Location(namespace, event.getId());
        System.out.println("Location: " + location.getKeyAsString());

        RiakObject riakObject = new RiakObject();
        riakObject.setContentType("application/json");
        BinaryValue binObj = BinaryValue.create(event.toString());
        riakObject.setValue(binObj);


        StoreValue storeEvent = new StoreValue.Builder(riakObject).withLocation(location).build();
        try {
            client.execute(storeEvent);
        }catch(Exception e) {

        }

        System.out.println("Event entered in to io.Riak bucket name: " + bucketName);
        System.out.println("Event: " + event.toString());
        System.out.println("curl -X GET http://riak1.cistechfutures.net:8098/types/" + bucketType + "/buckets/" + bucketName + "/keys/" + event.getId() + " | json_pp");


        return event.getId();

    }

    public JSONObject getEvent(String id) {

        Location location = new Location(namespace, id);
        FetchValue fv = new FetchValue.Builder(location).build();

        RiakObject obj;
        try {
            FetchValue.Response response = client.execute(fv);
            obj = response.getValue(RiakObject.class);
        }catch (Exception e) {
            throw new RuntimeException("Error executing riak query", e);
        }

        System.out.println("\nData retreived from io.Riak");
        System.out.println("Content-type: " + obj.getContentType());
        System.out.println("Vtag: " + obj.getVTag());
        System.out.println("Has indexes: " + !obj.getIndexes().isEmpty());
        System.out.println("Indexes: " + obj.getIndexes());
        System.out.println("Data: " + obj.getValue().toString());
        System.out.println(obj);

        return new JSONObject(obj.getValue().toString());
    }

    public  List<Map<String, List<String>>>  eventsAfter(String id, int  pageNum) {

        JSONObject event = getEvent(id);

        String dateString = event.get("created_dt").toString();
        String streamName = event.get("stream_s").toString();

        Date date = toDate(dateString);
        List<Map<String, List<String>>>  results = eventsSince(date, streamName, pageNum);

        return results;
    }

    public  List<Map<String, List<String>>> eventsSince(Date date, String streamName, int  pageNum) {

        if (pageNum < 1) pageNum = 1;
        int pageSize = 100;

        String streamField = "stream_s";
        String value = streamName;

        int startRow = pageSize * (pageNum - 1);
        System.out.println("querying rows " + startRow + " to " + (pageSize + startRow));
        String createdField = "created_dt";
        String fromDate = dateToIso8601(date);

        String querySTring = streamField + ":" + value + " AND " + createdField + ":[" + fromDate + " TO *]";
        System.out.println("Query String: '" + querySTring + "'");
        SearchOperation searchOp = new SearchOperation
                .Builder(BinaryValue.create(bucketType), querySTring)
                //.withSortField("created_dt")
                .withPresort("created_dt")
                .withStart(startRow)
                .withNumRows(pageSize)
                .build();

        cluster.execute(searchOp);
        // This will display the actual results as a List of Maps:


        List<Map<String, List<String>>> results;
        try {
            results = searchOp.get().getAllResults();
        }catch (Exception e) {
            throw new RuntimeException("Error executing riak query", e);
        }

        //ystem.out.println("query info: " + searchOp.getQueryInfo());
        //System.out.println("curl -X GET 'http://riak1.cistechfutures.net:8098/search/query/" + bucketType + "?wt=json&q=" + field + ":" + value +  "' | json_pp");

        return results;
    }

    private String dateToIso8601(Date date) {


        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        df.setTimeZone(tz);
        String dateString = df.format(date);
        return dateString;
    }


    private Date toDate(String date) {
        try {
            TimeZone tz = TimeZone.getTimeZone("UTC");
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
            return df.parse(date);
        } catch (Exception e) {
            throw new RuntimeException("Error converting date " + date + " for ISO 8601 format yyyy-MM-dd'T'HH:mm:ss'Z'", e);
        }
    }


    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        try {
            cluster.shutdown();
        } catch (Throwable t) {

        }

    }



    public static class RxEvent {

        JSONObject json = new JSONObject();

        public RxEvent(String type, String name, String payload) {

            TimeZone tz = TimeZone.getTimeZone("UTC");
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
            df.setTimeZone(tz);
            String nowAsISO = df.format(new Date());

            json.put("name_s", name);
            json.put("stream_s", type);
            json.put("id_s", UUID.randomUUID().toString());
            json.put("created_dt", nowAsISO);
            json.put("payload_s", payload);
        }

        public String getId() {
            return (String) json.get("id_s");
        }

        public String getStream() {
            return (String) json.get("stream_s");
        }

        public String getName() {
            return (String) json.get("name_s");
        }

        public String getData() {
            return ((String) json.get("payload_s")).toString();
        }

        public String getCreatedDate() {
            return (String) json.get("created_dt");
        }

        public void setData(JSONObject data) {
            json.put("payload_s", data);
        }

        public byte[] toBinary() {
            return json.toString().getBytes();
        }

        @Override
        public String toString() {
            return json.toString();
        }


    }
}
