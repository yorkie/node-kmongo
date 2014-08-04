
var mongodb = require('mongodb');

module.exports = function(name, options) {
  if (!name) {
    name = 'mongo';
    options = {
      host: 'localhost',
      port: 27017
    };
  }
  if (typeof name == 'object') {
    options = name;
    name = 'mongo';
  }
  options = options || {};
  var mongo = null;
  var host = options.host || 'localhost';
  var port = options.port || 27017;

  return function* (next) {
    if (this[name]) return yield next;

    try {
      mongo = yield createConnection(host, port, options);
      this.app.emit('ready');
    } catch (err) {
      this.app.emit('error', err);
    }

    if (!mongo) throw new Error('mongo init required');
    this[name] = mongo;
    yield next;
  };
}

function createConnection(host, port, options) {
  var options = options || {};
  var server = new mongodb.Server(host, port, options.server);
  var client = new mongodb.MongoClient(server, options.client);
  return function(callback) {
    client.open(callback);
  };
}
