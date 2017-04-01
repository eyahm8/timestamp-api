var express = require ('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;
var months = ['January','February','Month','April','May','June','July','August','September','October','November','December']



app.get('/:parsed', function (req, res) {

  if (isNaN(req.params.parsed)) {
    var time=new Date(req.params.parsed)
    if (typeof time == 'number') {
      res.json({
        unix: time/1000,
        natural:months[time.getMonth()]+' '+time.getDate()+', '+time.getFullYear()
    })
    } else {
      res.json({
        unix: null,
        time: null
      })
    }
  } else {
    var myDate = new Date(req.params.parsed*1000)
    res.json({
      unix: req.params.parsed,
      natural: months[myDate.getMonth()]+' '+myDate.getDate()+', '+myDate.getFullYear()
    })
  }
  console.log(req.url)
})

app.get("/", function(req, res) {
  var fileName = path.join(__dirname, "index.html");
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent: ', fileName);
    }
  });
});



app.listen(port, function () {
  console.log("listening on: " + port);
});
