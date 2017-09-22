var rp = require('request-promise');
	
var FCM = require('fcm-node');
var serverKey = 'AAAAM7yi_Fg:APA91bHbx0EXHXaume6KEZbnOSF1XU-eWs2jaNnEHMbSAxMLlPMXYXp77Om8vKap2AYkjbAikOvF__6PCi_eb9xVy3790gsX9SgseKbK3pLsTsZMfIMajw-zHjRGT3kTAC5lzHnFv77U'; //put your server key here 
var fcm = new FCM(serverKey);

var options = {
    uri: 'http://dev.db.suites.digital:8093/query/service',
    auth: {
    	user: "admin@suites.digital",
    	pass: "testpass"
    },
    body: {
 		statement: "SELECT * FROM moment WHERE docType = 'notification' AND documentStatus = 'active' ",
 		// statement: 'Select Meta(jdi).id,* from moment where docType="customer"'
      	//creds: {"user": "admin@suites.digital", "pass": "testpass"}
    },
    // qs: {
    //    creds: [{"user": "admin@suites.digital", "pass": "testpass"}] // -> uri + '?access_token=xxxxx%20xxxxx' 
    // },
    headers: {
       'User-Agent': 'Request-Promise',
       //'Authorization': 'Basic YWRtaW5Ac3VpdGVzLmRpZ2l0YWw6dGVzdHBhc3M='
    },
    json: true // Automatically parses the JSON string in the response 
};	


	// rp(options).then(function (docs) {
	//     console.log( docs.requestID);
	//     docs.results.forEach(function(data) {
	// 	  	console.log(data);

		  	
	// 	});
	// })
	// .catch(function (err) {
	//     // API call failed... 
	//     console.log( err);
	// });

    

function checkNotification(token) {
	var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
	    to: token, 
	    collapse_key: 'do_not_collapse',
	    
	    notification: {
	        title: "Test title ron", 
	        body: "Test title content"
	    },
	    
	    data: {  //you can send only notification or only data(or include both) 
	        my_key: 'my value',
	        my_another_key: 'my another value'
	    }
	};
  	fcm.send(message, function(err, response){
	    if (err) {
	        console.log(err);
	    } else {
	        console.log("Successfully sent with response: ", response);
	    }
	});
}

// Server
var io = require('socket.io').listen(8321);

io.on('connection', function(socket) {
	  socket.on('registerToken', function(token) {
			// setInterval(function() {
	   			checkNotification(token);
			// }, 1000);
	  });
});

// Mirror
// var ioIn = require('socket.io').listen(8123);
// var ioOut = require('socket.io-client');
// var socketOut = ioOut.connect('http://localhost:8321');


// ioIn.on('connection', function(socketIn) {
//   socketIn.on('foo', function(msg) {
//     socketOut.emit('bar', msg);
//   });
// });

 
// fcm.subscribeToTopic([ 'device_token_1', 'device_token_2' ], 'notification', (err, res) => {
//     // assert.ifError(err);
//     // assert.ok(res);
//     // done();
// });