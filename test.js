
var test = require('tape');
var kmongo = require('./index');
var EE = require('events').EventEmitter;
var co = require('co');

test('simple test', function(t) {
  var app = new EE();
  var usefunc = kmongo('mongo', app);
  app.once('ready', function() {
    t.end();
    process.exit();
  });
  app.once('error', function(err) {
    t.end();
  });
});

test('simple test without app', function(t) {
  var app = new EE();
  app.on('error', function(err) {
    t.end();
    process.exit();
  });
  
  // fake generator: next
  function * next() {};
  
  // monitoring koajs behaviour
  co(function * () {
    try {
      yield kmongo('mongo').call(app, next);
    } catch (err) {
      app.emit('error', err);
    }
  })();
});

