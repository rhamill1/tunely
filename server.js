// SERVER-SIDE JAVASCRIPT

//require express in our app
var db = require("./models");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
// generate a new express app and call it 'app'


// serve static files from public folder


/************
 * DATABASE *
 ************/


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
  db.Album.find(function(err, albums){
    if (err) { return console.log("index error: " + err); }
    res.json(albums);
  });
});

app.post('/api/albums', function (req, res) {
  var newAlbum = new db.Album(req.body);
  // console.log(newAlbum)
  newAlbum.save(function (error, savedData) {
    if (error){console.log(error)};
      res.json(savedData);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
