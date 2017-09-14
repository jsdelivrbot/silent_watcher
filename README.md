silent_watcher
==============

Readme :D
--------------
Every once in a while we need to learn a bit about someone. 

**Simply clone this and run it on a server (like Heroku), and you can get the public information of anyone who goes to the page, just from them clicking the link :D**

This simple nodejs project will log all of the users who visit the URL it is uploaded and save their public information, such as IP Address, Location (as precise as public can get), and more! All you have to do is go to {your_site}/database to view the data of people who have visited. 

**Index.html is customizable.** Make it look like whatever you want. You can make it look like a completely different site if you'd like! It logs all of the information as soon as the user connects. 


Highlights:
+	Silently logs all users who enter site
+	Records Date/Time entered, Timezone, IP Address, Latitude, Longitude, Continent, City, ZIP Code, Language, Device Specs, Screen Height, and Screen Width
+	Viewable Database to see logs via ./database

See an example here:
[Heroku Example (Go to theurl/database to see info)](https://evening-river-34374.herokuapp.com/)

![Image of Love](https://i.pinimg.com/originals/19/1e/79/191e791f3ef6ca96a96502164859cf3f.jpg)

Running Locally
--------------
Requirements:
Make sure you have:
+	Node.js
+	NPM
+	Redis
Run this in a seperate terminal window:
```javascript
redis-server
```
Once Redis is running, run this: 
```javascript
git clone git@github.com:iamameme/silent_watcher.git # or clone your own fork
cd node-js-sample
npm install
npm start
```

To Upload to Heroku
------------------
If you want to make your own instance of this on your own url, here's a quick guide on how to upload it:

Requirements:
+	Heroku Command Line Tools
+	A credit card on your Heroku account for Redis (Won't charge it, the redis is FREE)

```javascript
heroku create
git push heroku master
heroku addons:create heroku-redis:hobby-dev -a {HEROKU APP NAME}
heroku open
```

What if I Don't Want People to be Able to Access the Data via /database?
------------------
Just remove these lines and you can just access it via heroku command line (or whatever other host you use), or change the URL link

```javascript
app.get('/database', function(request, response) {
  response.sendFile(path.join(__dirname+'/database.html'));
})
```
