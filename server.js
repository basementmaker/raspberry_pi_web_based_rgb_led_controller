var express = require('express');
var app = express();
var Gpio = require('pigpio').Gpio;
var path = require('path');

redLED = new Gpio(17, {mode: Gpio.OUTPUT});
greenLED = new Gpio(22, {mode: Gpio.OUTPUT});
blueLED = new Gpio(24, {mode: Gpio.OUTPUT});

app.get('/spectrum.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/spectrum.js'));
});

app.get('/spectrum.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/spectrum.css'));
});

app.get('/', function (req, res) {

  if ( typeof req.query.red_value !== 'undefined' && req.query.red_value ) {
    console.log('red_value: '+req.query.red_value);
    redLED.pwmWrite(req.query.red_value);
  }

  if ( typeof req.query.green_value !== 'undefined' && req.query.green_value ) {
    console.log('green_value: '+req.query.green_value);
    greenLED.pwmWrite(req.query.green_value);
  }

  if ( typeof req.query.blue_value !== 'undefined' && req.query.blue_value ) {
    console.log('blue_value: '+req.query.blue_value);
    blueLED.pwmWrite(req.query.blue_value);
  }

  res.sendFile(path.join(__dirname + '/html_controller.html'));

  //res.send('<center><h1>RGB LED Controller</h1></center><form action="/" method="get"><input id="red_value" type="hidden" name="red_value" value="255"><input type="submit" value="Red On"></form> <form action="/" method="get"><input id="red_value" type="hidden" name="red_value" value="0"><input type="submit" value="Red Off"></form><br><form action="/" method="get"><input id="green_value" type="hidden" name="green_value" value="255"><input type="submit" value="Green On"></form> <form action="/" method="get"><input id="green_value" type="hidden" name="green_value" value="0"><input type="submit" value="Green Off"></form><br><form action="/" method="get"><input id="blue_value" type="hidden" name="blue_value" value="255"><input type="submit" value="Blue On"></form> <form action="/" method="get"><input id="blue_value" type="hidden" name="blue_value" value="0"><input type="submit" value="Blue Off"></form><br>');
});

app.listen(8080, function () {
	console.log('Server running!');
});
