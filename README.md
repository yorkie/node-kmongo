
kmongo [![Build Status](https://travis-ci.org/yorkie/node-kmongo.svg?branch=master)](https://travis-ci.org/yorkie/node-kmongo)
=============
koa-mongo: use [node-mongodb-native](https://github.com/mongodb/node-mongodb-native) in koajs togather with connection pool.

### Installation
```bash
$ npm install kmongo --save
```

### API

##### kmongo([name, option, context])

* `name`: the field name in your koa `ctx` variable

* `option`: the mongo options, see this [doc](https://github.com/mongodb/node-mongodb-native/blob/master/docs/articles/MongoClient.md) for more details.

* `context`: if you wanna use `ready` event, then pass a trigger here, best value is your `app`.

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

If you don't like the `ready` trigger, then you just handle an error in the common event `error` like following:

```js
app.use(kmongo('mongo', opt));
app.on('error', function(err) {
  console.log(err);
  // here we could handle mongodb error
});
app.listen(80);
```

### License
MIT
