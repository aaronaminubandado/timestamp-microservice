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


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
    let date;

    if(!req.params.date){
        date = new Date();
    }else{
        if (!isNaN(req.params.date)) {
            date = new Date(parseInt(req.params.date))
        } else {
            date = new Date(req.params.date)
        }
    }

    if(date.toString() === 'Invalid Date'){
        res.json({ error: date.toString() });
    }
    else{
        const unix = date.getTime();
        const utc = date.toUTCString();
        res.json({ unix, utc });
    }

});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});