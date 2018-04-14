var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var someObject = require('./news.json');
var someObject2 = require('./breakNews.json');
var fs = require('fs');

//-------------------------------take in------------//

//#1
/*
//insert one whole json object
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  //var myobj = { name: "Company Inc", address: "Highway xxx" };
  dbo.collection("customers").insertOne(someObject, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
*/


//#2
/*
//insert an array of json object
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  //var myobj = { name: "Company Inc", address: "Highway xxx" };
  dbo.collection("customers").insertMany(someObject2, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
*/

//-------------------------------take out----------------------------------------//


//#3
/*
var findDoc = function(db, callback){
	var dbo = db.db("mydb");
	var collection = dbo.collection("customers");
	collection.find().toArray(function(err,result){
		result.sort(function(a,b){
			var c = new Date(a.publishedAt);
			var d = new Date(b.publishedAt);
			return d-c;
		});
		result = result.slice(0,1);
		callback(result);
	})
}

MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");
  findDoc(db, function(result) {
    //console.log(result);
    exports.getFile = function() {
      return result;
    }
    //console.log(result);
    db.close();
  });
});

*/


//#4
	//use array object to return all info and can write them to json
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  var query = {};

	  dbo.collection("customers").find(query).toArray(function(err,result) {
	    //if (err) throw err;
	    //console.log(result);
	    //console.log(result.length);

	    //print all the titles
		//for (var i=0; i < result.length; i++){
		//	console.log(result[i].title);
		//}

		//sort the array based on time published, newest to oldest
		result.sort(function(a,b){
			var c = new Date(a.publishedAt);
			var d = new Date(b.publishedAt);
			return d-c;
		});

		//trim the array, take the first ten
		result = result.slice(0,9);
		//console.log(result.length);
		console.log(result);

	    //fs.writeFile('123.json', JSON.stringify(result, null,4), function(err){
	    //  console.log('write file success!')
	    //});
		db.close();
		//console.log(result);
	  });
	 //return(arr);
	  //db.close();
	});


//#5
/*
//use cursor object to return all the titles
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = {};


  dbo.collection("customers").find(query).forEach(function(mydoc) {
    //console.log(result);

    console.log("title: " + mydoc.title);

    //db.close();
  },function(err){
  	if (err) throw err;
  });
  db.close();
});
*/