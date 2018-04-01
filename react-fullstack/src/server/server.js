//instructions to use:
//need to connect to db with these commands:

//cd C:\Program Files\MongoDB\Server\3.6\bin on windows
//mongod

var fs = require('fs');
const NewsAPI = require('newsapi');
var ejs = require('ejs');
var cron = require('node-cron');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/mydb";
const newsapi = new NewsAPI('fca01394a9cc4e05b32d322eac33c1a4');

//return jason object containing all news
var app = express();
app.get('/', function (req, res) {
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.collection("news").find({}).toArray( function(err, result) {
	  	if (err) throw err;
	  	//res.setHeader('Content-Type', 'application/json');
	    res.json(result);
	    db.close();
	  	});
	});
});

//return jason object containg last 10 news
app.get('/last10news', function (req, res) {
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.collection("news").find({}).toArray( function(err, result) {
	  	if (err) throw err;
	  	//res.setHeader('Content-Type', 'application/json');
	   	result.sort(function(a,b){
		 	var c = new Date(a.publishedAt);
		 	var d = new Date(b.publishedAt);
		 	return d-c;
		});
		// //trim the array, take the first ten
		result = result.slice(0,10);
	    res.json(result);
	    db.close();
	  	});
	});
});

//set built-in varibale values and render home page
app.set('views', './');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//Schedule news retrival job-------------------------------------

//execute every hour
var fetchNews = cron.schedule('* */1 * * *', function(){

	newsapi.v2.topHeadlines({
		sources: 'hacker-news',
		language: 'en'
		}).then(response => {
		response = response.articles
		fs.writeFile('techNews.json', JSON.stringify(response, null,4), function(err){
					console.log('write file success!')
		})
	});

	console.log('running a task every hour');
	//insert techNews file to news collection
	MongoClient.connect(url, function(err, db) {
	  	if (err) throw err;
	  	console.log("Database connected!");
		var dbo = db.db("mydb");
		var data = require('./techNews.json');
		dbo.collection("news").insertMany(data, function(err, res) {
		   if (err) throw err;
		   console.log("news inserted");
		});
		db.close();
	});
});

fetchNews.start();


// //DB-------------------------------------
// //create db and collection (needed only the first time running)
// var createCollection = MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   var dbo = db.db("mydb");
//   dbo.createCollection("news", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
//   db.close();
// });

//createCollection.start();

var server = app.listen(8888, function(){
});
