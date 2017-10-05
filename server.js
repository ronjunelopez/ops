var couchbase = require("couchbase");

// var cluster = new couchbase.Cluster('couchbase://dev.db.suites.digital');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1');

// cluster.authenticate("tester", "tester");


var bucket = cluster.openBucket('moment-sync', function(err) {
	  if (err) {
	    // Failed to make a connection to the Couchbase cluster.
	    throw err;
	  }


	
	  
});


var ViewQuery = couchbase.ViewQuery;
var query = ViewQuery.from('dev_notification', 'all');

// console.log(query.toLiveQuery());

bucket.query(query, function(err, results) {
	if(err) {
		throw err;
	}
	  for(i in results) {
	    console.log('Row:', results[i]);
	  }
});