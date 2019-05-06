const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var Promise = require("bluebird");
var request = require('request-promise');

const apiKey = process.env.THEMOVIEDB_API_KEY;
const apiSecret = process.env.THEMOVIEDB_API_SECRET;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
  
app.get('/', function (req, res) {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    request(url, function (err, response, body) {
        if(err){
          res.send({movies: null, error: 'Error, please try again'});
        } else {
          let movies = JSON.parse(body)
          if(movies.results == undefined){
            res.send({movies: null, error: 'Error, no movies to display'});
          } else {
            let moviesText = `Movie is up!`;
            res.send({movies: movies.results, error: null});
          }
        }
      });
  })
  
  app.get('/:page', function (req, res) {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${req.params.page}`
    request(url, function (err, response, body) {
        if(err){
          res.send({movies: null, error: 'Error, please try again'});
        } else {
          let movies = JSON.parse(body)
          if(movies.results == undefined){
            res.send({movies: null, error: 'Error, no movies to display'});
          } else {
            res.send({movies: movies.results, error: null});
          }
        }
      });
  })
  
  app.get('/description/:movie_id/:page', function (req, res) {
    var requests = [{
        url: `https://api.themoviedb.org/3/movie/${req.params.movie_id}?api_key=${apiKey}&language=en-US&page=1`
      }, {
        url: `https://api.themoviedb.org/3/movie/${req.params.movie_id}/similar?api_key=${apiKey}&language=en-US&page=${req.params.page}`
      }];
    Promise.map(requests, function(obj) {
        return request(obj).then(function(body) {
            return JSON.parse(body);
          });
        }).then(function(results) {
            res.send({movies: results[0], error: null, similar: results[1].results});
        }, function(err) {
            res.send({movies: null, error: 'Error, no movies to display', similar: null});
        });
  })
  
  app.post('/similar/:movie_id/:page', function (req, res) {
    let url = `https://api.themoviedb.org/3/movie/${req.params.movie_id}/similar?api_key=${apiKey}&language=en-US&page=${req.params.page}`
    request(url, function (err, response, body) {
        if(err){
          res.render('index', {movies: null, error: 'Error, please try again', similar: null});
        } else {
          let movies = JSON.parse(body)
          if(movies == undefined){
            res.render('index', {movies: null, error: 'Error, no movies to display', similar: null});
          } else {
            let moviesText = `Movie is up!`;
                res.render('index', {movies: movies.results, error: null, similar: null});
          }
        }
      });
  })