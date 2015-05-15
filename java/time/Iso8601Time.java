package time;


import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;


public class Iso8601Time {

    public static String RANGE_DELIMITER = "/";
    public static String ERROR_DATE = "9999-09-09T09:09:09Z";

    private static SimpleDateFormat solrFormat =
            new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");

    // Additional date formats should be ordered from most precision to least precision
    private static ArrayList<String> dateFormats =
            new ArrayList<String>(Arrays.asList("yyyy-MM-dd", "yyyy-MM", "yyyy"));

    public Iso8601Time() {
    }



    public static void main(String[] args) {

        //solrFormat

        System.out.println();
    }

    /**
     * Given a ISO 8601 date in String format, converts to a String formatted date that
     * Solr understands, the fully expanded 'Z' format. This method will compute and return
     * the date value for the 'start' of the value given to provide a point in time date.
     *
     * This is to be called from an XSLT document so all exceptions will be caught inside
     * the method and a flaggable error date value will be returned in the case
     * of an unrecoverable exception, allowing for Solr queries to locate bad records
     *
     * Examples of conversion values:
     *
     * 1970-02-22 becomes 1970-02-22T00:00:00Z
     * 1970 becomes 1970-01-01T00:00:00Z
     * 1970/1980 becomes 1970-01-01T:00:00:00Z
     *
     *
     * @param isoDate the date or date range to be converted in ISO 8601 String format
     * @return the Solr appropriate start time
     */
    public static String getStartDateFromIsoDateString(String isoDate) {
        try {
            String solrDate;
            String[] range;

            range = isoDate.split(Iso8601Time.RANGE_DELIMITER);
            String startDate = range[0];

            solrDate =
                    Iso8601Time.getStartDateFromSingleDate(startDate);

            if (solrDate == null || solrDate.length() <= 0) {
                return ERROR_DATE;
            }

            return solrDate;

        } catch (Exception e) {
            return ERROR_DATE;
        }
    }

    /**
     * Given a ISO 8601 date in String format, converts to a String formatted date that
     * Solr understands, the fully expanded 'Z' format. This method will compute and return
     * the date value for the 'end' of the value given to provide a point in time date.
     *
     * This is to be called from an XSLT document so all exceptions will be caught inside
     * the method and a flaggable error date value will be returned in the case
     * of an unrecoverable exception, allowing for Solr queries to locate bad records
     *
     * Examples of conversion values:
     *
     * 1970-02-22 becomes 1970-02-22T23:59:59Z
     * 1970 becomes 1970-12-31T23:59:59Z
     * 1970/1980 becomes 1980-12-31T:23:59:59Z
     *
     * @param isoDate the date or date range to be converted in ISO 8601 String format
     * @return the Solr appropriate end time
     */

    public static String getEndDateFromIsoDateString(String isoDate) {
        try {
            String solrDate;
            String[] range;
            range = isoDate.split(Iso8601Time.RANGE_DELIMITER);
            String endDate = range[range.length - 1];

            solrDate =
                    Iso8601Time.getEndDateFromSingleDate(endDate);
            if (solrDate == null || solrDate.length() <= 0) {
                return ERROR_DATE;
            }

            return solrDate;

        } catch (Exception e) {
            return ERROR_DATE;
        }
    }

    /**
     * Given a single ISO 8601 date in String format, converts to a String formatted date that
     * Solr understands, the fully expanded 'Z' format. This method will compute and return
     * the date value for the 'end' of the value given to provide a point in time date.
     *
     * Examples of conversion values:
     *
     * 1970-02-22 becomes 1970-02-22T23:59:59Z
     * 1970 becomes 1970-12-31T23:59:59Z
     *
     * @param singleIsoDateString the single date to be converted in ISO 8601 string format
     * @return the Solr appropriate end time
     */

    public static String getEndDateFromSingleDate(String singleIsoDateString) {
        String solrDateString = new String();

        for (String dateFormat: dateFormats) {
            SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
            try {

                Date modDate = sdf.parse(singleIsoDateString);
                Calendar cal = Calendar.getInstance();
                cal.setTime(modDate);

                if (dateFormat.equals("yyyy")) {
                    cal.add(Calendar.YEAR, 1);
                    cal.add(Calendar.SECOND, -1);
                }
                if (dateFormat.equals("yyyy-MM")) {
                    cal.add(Calendar.MONTH, 1);
                    cal.add(Calendar.SECOND, -1);
                }
                if (dateFormat.equals("yyyy-MM-dd")) {
                    cal.add(Calendar.DAY_OF_YEAR, 1);
                    cal.add(Calendar.SECOND, -1);
                }

                modDate = cal.getTime();
                solrDateString = solrFormat.format(modDate);

                return solrDateString;

            } catch (ParseException pe) {
                // Nothing exciting, catch attempted parses that don't match precision
            }
        }
        // A date should always be parsed and returned before this point
        return solrDateString;
    }

    /**
     * Given a single ISO 8601 date in String format, converts to a String formatted date that
     * Solr understands, the fully expanded 'Z' format. This method will compute and return
     * the date value for the 'start' of the value given to provide a point in time date.
     *
     * Examples of conversion values:
     *
     * 1970-02-22 becomes 1970-02-22T23:59:59Z
     * 1970 becomes 1970-12-31T23:59:59Z
     *
     * @param singleIsoDateString the single date to be converted in ISO 8601 string format
     * @return the Solr appropriate end time
     */

    public static String getStartDateFromSingleDate(String singleIsoDateString) {
        String solrDateString = new String();

        for (String dateFormat: dateFormats) {
            SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
            try {

                Date modDate = sdf.parse(singleIsoDateString);
                Calendar cal = Calendar.getInstance();
                cal.setTime(modDate);

                modDate = cal.getTime();
                solrDateString = solrFormat.format(modDate);

                return solrDateString;

            } catch (ParseException pe) {
                // Nothing exciting, catch attempted parses that don't match precision
            }
        }
        // A date should always be parsed and returned before this point
        return solrDateString;
    }
}


