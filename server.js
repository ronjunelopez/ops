var couchbase = require("couchbase");

var cluster = new couchbase.Cluster('couchbase://dev.db.suites.digital:8091');
var bucket = cluster.openBucket('moment', function(err) {
	  if (err) {
	    // Failed to make a connection to the Couchbase cluster.
	    throw err;
	  }
	  
});

bucket.operationTimeout = 5000;

bucket.get('notification::04798fa7-4467-4307-9bb0-b6c950a8d304', function(err, result) {
		 if (err) {
      // Failed to retrieve key
      throw err;
    }

    console.log(result);

});