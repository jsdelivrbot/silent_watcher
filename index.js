var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
const low = require('lowdb')
var bodyParser = require('body-parser');
var json2html = require('node-json2html');
var redis = require("redis"),
    client = redis.createClient();
var redisdata = { "visitors" : [] };

client.flushdb( function (err, succeeded) {
    console.log(succeeded); // will be true if successfull
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());

// Loads all redis hashes
client.hkeys("hash key", function (err, replies) {
    replies.forEach(function (reply, i) {
        redisdata.visitors.push(JSON.parse(reply));
    });
    console.log(redisdata);
});

// Creates database.html
var transform = [
  {'<>':'h2','html':'Entry from ${date_visited}:${time_visited}'},
  {'<>':'li','html':'Timezone - ${timezone}'},
  {'<>':'li','html':'IP Address - ${ip_address}'},
  {'<>':'li','html':'Latitude - ${position.latitude}'},
  {'<>':'li','html':'Longitude - ${position.longitude}'},
  {'<>':'li','html':'Continent - ${continent.name}'},
  {'<>':'li','html':'Country - ${country.name}'},
  {'<>':'li','html':'City - ${city.name}'},
  {'<>':'li','html':'Zip Code - ${city.code}'},
  {'<>':'li','html':'Language - ${language}'},
  {'<>':'li','html':'Device - ${device}'},
  {'<>':'li','html':'Screen Width - ${screen_width}'},
  {'<>':'li','html':'Screen Height - ${screen_height}'}
];
var html = json2html.transform(redisdata.visitors,transform); 
fs.writeFile("./database.html", html, function(err) {}); 

// Gets data and writes to file db.json
app.post('/huehue', function(req, res) {
	// Add to database
	client.hset("hash key", JSON.stringify(req.body), "some value", redis.print);

  // Reloads redis database file
	client.hkeys("hash key", function (err, replies) {
		var transform = [
		  {'<>':'h2','html':'Entry from ${date_visited}:${time_visited}'},
		  {'<>':'li','html':'Timezone - ${timezone}'},
		  {'<>':'li','html':'IP Address - ${ip_address}'},
		  {'<>':'li','html':'Latitude - ${position.latitude}'},
		  {'<>':'li','html':'Longitude - ${position.longitude}'},
		  {'<>':'li','html':'Continent - ${continent.name}'},
		  {'<>':'li','html':'Country - ${country.name}'},
		  {'<>':'li','html':'City - ${city.name}'},
		  {'<>':'li','html':'Zip Code - ${city.code}'},
		  {'<>':'li','html':'Language - ${language}'},
		  {'<>':'li','html':'Device - ${device}'},
		  {'<>':'li','html':'Screen Width - ${screen_width}'},
		  {'<>':'li','html':'Screen Height - ${screen_height}'}
		];
		var redisdata = { "visitors" : [] };
	    replies.forEach(function (reply, i) {
	        redisdata.visitors.push(JSON.parse(reply));
	    });
	    var html = json2html.transform(redisdata.visitors,transform);

	    fs.writeFile("./database.html", html, function(err) {}); 
	});
});


app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/database', function(request, response) {
  response.sendFile(path.join(__dirname+'/database.html'));
})

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
})




