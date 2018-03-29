var fs = require('fs');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('73f4cef40a3c444c9040fa8a54189546');

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  //sources: 'bbc-news,the-verge',
  //q: 'bitcoin',
  category: 'technology',
  language: 'en',
  country: 'us'
}).then(response => {
  //console.log(response);
  
  var newRes = response.articles;
  //console.log(newRes);

  fs.writeFile('breakNews.json', JSON.stringify(newRes, null,4), function(err){
        console.log('write file success!')
      });

  //console.log(response.articles[0].url);
  
  /*
    {
      status: "ok",
      articles: [...]
    }
*/  
});