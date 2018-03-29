var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var fileManager = require('./fileManager');

app.get('/fetch',function(req,res){
	
	url = 'http://www.cbc.ca/news/technology';

	request(url, function(error,response,html){

		if(!error){

			var $ = cheerio.load(html);
			var title, link;

			var jsonData = {title : "", link : ""};

		  $('span.promo-title.complexlink-target').each(function(){
		        var data = $(this);
		        titleP = data.text() + '\n';            
		       //release = data.children().last().children().text();

		        jsonData.title = jsonData.title + titleP;


		        //jsonData.release = release;

				console.log(titleP);
		    })		    
		  
		  $('ul.promocollection-list > li.promo').each(function(){
		  		var data = $(this);
		  		linkP = data.first().html() + '\n';
		  		jsonData.link = jsonData.link + linkP;
		  })

		  fs.writeFile('CBC.json', JSON.stringify(jsonData, null,4), function(err){
				console.log('write file success!')
			})

	}



	res.send('End');
	});

})

app.listen('8081');
console.log('listing on port 8081');
exports = module.exports = app;


