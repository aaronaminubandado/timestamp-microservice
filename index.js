// index.js

// init project
var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get("/api/", function (req, res) {
    const date = new Date();


    if (!isNaN(date.getTime())) { 
        const unix = date.getTime();
        const utc = date.toUTCString();
        res.json({ unix, utc });
    } else {
        res.json({ error: 'Invalid Date' });
    }
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
    const date = new Date(req.params.date);

    if(req.params.date.length === 0){
        date = new Date();
    }

    if (!isNaN(date.getTime())) { 
        const unix = date.getTime();
        const utc = date.toUTCString();
        res.json({ unix, utc });
    } else {
        res.json({ error: 'Invalid Date' });
    }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});