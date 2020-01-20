//for raspberry pi with serial gps module
const file = '/dev/ttyAMA0';
let GPS = require('gps');
let SerialPort = require('serialport');

let port = new SerialPort(file, {
    baudRate: 9600,
    parser: new SerialPort.parsers.Readline('\r\n')
  });

let gps = new GPS;

gps.on('data', function(data) {
  location = data;
  console.log(data);
});

port.on('data', function(data){
	gps.update(data);
});

let location;
module.exports = { location};