package photon.java;

import java.io.Serializable;

import java.util.Comparator;
import java.util.Map;

public class EntryComparator implements Comparator<Map.Entry>, Serializable {
    public int compare(Map.Entry e1, Map.Entry e2) {
	long entry1 = ((Long)e1.getKey()).longValue();
	long entry2 = ((Long)e2.getKey()).longValue();

	if(entry1 == entry2) {
	    return 0;
	} else if (entry1 > entry2) {
	    return 1;
	} else {
	    return -1;
	}
    }
}

