<img src="./src/public/logo-full-128.png" width="300px">

Not many industries are as dynamic and inviting as the technology industry. IT professional needs to constantly learn new knowledge and stay up-to-date with the trends to be on the edge of productivity. As for technology enthusiasts in general, a go-to platform to grab news and trending topics in the tech field is also in demand to help relieve the burden of spending much time going through numerous of sites.

## Deployment

In order to run the application, please ensure a vagrant has been setup.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Reload after editing code.<br>
Lint of errors will be shown in the console.

### Mongo Database

This application uses the [Mongo Lab](https://mlab.com) for the Mongo Database.

All data is stored in the database "news-repo", and it contains the following collections,
* news
* comments

### Access to Application

After running via vagrant, the application is accessible from ```http://localhost:3000```.

## Features

### Fetch News from Third-Party Sources

The server has an API path ```/fetch``` for scraping news articles from the following sites,
* Hacker News
* Techcrunch
* Techcrunch China
* Mashable
* The Next Web
* Wired
* Crypto Coins News

The fetched articles will be stored into the news collection.

### List Articles Getting Started

The server has an API path ```/news``` for returning all the stored news articles.
The data from backend server is displayed at ```http://localhost:3000```.

### Display Article Detail Information

The server has an API path ```/article/:id``` for returning all the information for an article.
The data from backend server is displayed at ```http://localhost:3000/article/:id```.


### Link to Original News Article

On the detail article page, there is an link icon to link to the original article.

### Link to Original News Site

On the detail article page, there is a tag to link to the original site where the aricle originates.

### Add Comment to News Article

The server has an API path ```/comment``` for adding a comment for an article.
On the detail article page, there is a form for adding new comments to an news article.

### List Article Comments

The server has an API path ```/comments/:id``` for returning all the comments for an article.
The data from backend server is displayed at ```http://localhost:3000/article/:id```.

### Support for Mobile Screens

The home page at ```http://localhost:3000``` is mobile-friendly and resizes reactively based on the screen resolutions.

## Contributor
* Azmarie Wang
* April Qin
* Jerome Lu
* Ray Wang

## Reference
* Yeoman generator for React.js projects (https://www.npmjs.com/package/generator-react-fullstack)
* React Starter Kit (https://www.reactstarterkit.com/)
* News API (https://newsapi.org/)
* cors-anywhere (https://cors-anywhere.herokuapp.com/)
