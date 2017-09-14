var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
var bodyParser = require('body-parser');
var json2html = require('node-json2html');
var database = require('./db.json');
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
var html = json2html.transform(database.visits,transform);
fs.writeFile("./database.html", html, function(err) {
}); 

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))


db.defaults({ visits: [] })
  .write()

// Gets data and writes to file db.json
app.post('/huehue', function(req, res) {
	// Add to database
	db.get('visits')
	  .push(req.body)
	  .write() 

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
