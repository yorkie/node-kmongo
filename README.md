
kmongo
=============
koa-mongo: use node-mongodb-native in koajs togather with connection pool.

### Installation
```sh
$ npm install kmongo
```

### Usage

register at startup of your app:
```js
var kmongo = require('kmongo');
var app = koa();
var opt = {
  host: 'localhost',
  port: 27017,
  server: {
    poolSize: 10,
    auto_reconnect: true
  }
};

app.use(kmongo('mongo', opt, app));
app.once('ready', function() {
  // connection created
  app.listen(80);
});
```

use it in your router generator function
```js
this.getUser = function * () {
  var db = this.mongo.db('users');
  // no need to close this collection because of mongodb usage
}
```

### License
MIT
