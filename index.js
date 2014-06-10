
var co = require('co');
var mongodb = require('mongodb');
var EE = require('events').EventEmitter;

module.exports = function(name, options, app) {
  var args = nomalizeArgs.apply(this, arguments);
  var mongo = null;
  var host = args.options.host || 'localhost';
  var port = args.options.port || 27017;

  co(function * () {
    mongo = yield createConnection(host, port, args.options);
    args.app.emit('ready');
  })();
  return function * (next) {
    if (!mongo) throw new Error('mongo init required');
    this[args.name || 'mongo'] = mongo;
    yield next;
  };
}

function nomalizeArgs() {
  var ret = {
    name: 'mongo',
    options: {},
    app: null
  };
  for (var i=0; i<arguments.length; i++) {
    var item = arguments[i];
    switch (typeof item) {
      case 'string': ret.name = item; break;
      case 'object':
        if (item instanceof EE)
          ret.app = item;
        else
          ret.options = item;
        break;
    };
  }
  return ret;
}

function createConnection(host, port, options) {
  var options = options || {};
  var server = new mongodb.Server(host, port, options.server);
  var client = new mongodb.MongoClient(server, options.client);
  return function(callback) {
    client.open(function(err, client) {
      if (err) {
        return occurredDBError(client, err, callback);
      } else {
        return callback(null, client);
      }
    });
  };
}
