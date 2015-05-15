package config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


/** * Java Program to demonstrate how to load resources e.g. properties file from
 * * classpath. There are two ways to load resources in Java, one by using
 * * getResourceAsStream() and getResource() method from java.lang.Class. Main
 * * difference between these two methods are that one returns an InputStream
 * * while other returns a URL object.
 * *
 * * @author Javin Paul
 * */

public class PropsLoader {

    public static void main(String args[]) {

        String propname = "riak.bucket.name";
        System.out.println(propname + ": " + getProperties("config.properties").getProperty(propname));

    }

    public static Properties getProperties(String filename) {

        InputStream in = PropsLoader.class.getResourceAsStream(filename);
        Properties config = new Properties();
        try {
            config.load(in);
            return config;

        } catch (Exception e1) {
            throw new RuntimeException(e1);
        }

    }

}