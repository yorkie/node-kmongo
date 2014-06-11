
var test = require('tape');
var kmongo = require('./index');
var EE = require('events').EventEmitter;

test('simple test', function(t) {
  var app = new EE();
  var usefunc = kmongo('mongo', app);
  app.once('ready', function() {
    t.end();
    process.exit();
  });
  app.once('error', function(err) {
    t.end();
    process.exit();
  });
});
