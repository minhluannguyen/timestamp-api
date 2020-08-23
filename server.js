// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date_string?", (req, res, next) => {
  let dateString = req.params.date_string;  
  console.log(dateString);
  //console.log(typeof(dataString));
  let time = new Date(dateString);
  if (dateString === undefined)
  {
    time = new Date();
    console.log(12345);
  }
  
  let tmp;

  console.log(time);
  //console.log(typeof(time));
  console.log(time.getTime());
  console.log(time.toUTCString());
  
   //A 4 digit number is a valid ISO-8601 for the beginning of that year
  //5 digits or more must be a unix time, until we reach a year 10,000 problem
  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  }
  
  if (time != "Invalid Date") {
    console.log(1);
    tmp = {
      "unix": time.getTime(),
      "utc": time.toUTCString()
    };
  } else {
    console.log(2);
    tmp = { "error": "Invalid Date" };
  }
  
  res.json(tmp);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
