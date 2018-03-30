import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import schema from './data/schema';
import Router from './routes';
import assets from './assets';
import { port, auth, analytics } from './config';
import fs from 'fs';
import cron from 'node-cron';
//import newsapi from 'newsapi';

const server = global.server = express();
var NewsAPI = require('newsapi');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var newsapi = new NewsAPI('fca01394a9cc4e05b32d322eac33c1a4');

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
server.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  getToken: req => req.cookies.id_token,
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
}));
server.use(passport.initialize());

server.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false })
);
server.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  }
);

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

server.get('/news', (req, res) => {
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

server.get('/fetch', (req, res) => {
  console.log('fetching ...');
  //cron.schedule('* * * * *', function(){
    console.log('scheduled job running ...');
	  newsapi.v2.topHeadlines({
	  	sources: 'hacker-news',
	  	language: 'en'
	  }).then(response => {
      console.log('writing file ...');
	  	response = response.articles;

      fs.writeFile('techNews.json', JSON.stringify(response, null,4), function(err){
        console.log('write file success!')

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
	  });

	  console.log('running a task every hour');
	  //insert techNews file to news collection
	  // MongoClient.connect(url, function(err, db) {
	    // if (err) throw err;
      // console.log("Database connected!");
//
	  	// var dbo = db.db("mydb");
	  	// var data = require('./techNews.json');
	  	// dbo.collection("news").insertMany(data, function(err, res) {
	  	   // if (err) throw err;
	  	   // console.log("news inserted");
	  	// });
	  	// db.close();
	  // });
  //});

  res.json({});
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const template = require('./views/index.jade');
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };

    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }

    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => (data.title = value),
      onSetMeta: (key, value) => (data[key] = value),
      onPageNotFound: () => (statusCode = 404),
    };

    await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.jade');
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
