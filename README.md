# Sparkling API

[RxJS](http://reactivex.io/) based, [DDP](https://www.meteor.com/ddp) powered, [Express.js](http://expressjs.com/) extension for building reactive API's.

## The idea

As web developers, we are building RESTful API's for years already. HTTP proved itself in hardest battles, but there is a new demand.

Real-time web applications require another type of API's that would bring reactivity to applications.

*Sparkling* aims to augment your existing RESTful API's with observable entities, reachable on a client so an application could react on server changes and access streams of data in Reactive Extensions way.

## Reactive Extensions

RxJS is an API for asynchronous programming with observable streams.  It's build upon idea that everything application handles is a **stream**, doesn't matter it's UI events or server data flow.

*Sparkling* focus is on server side, leaving client implementation framework agnostic.

## Example

Integrate it into Express.js application, as

```js
var express = require('express');
var sparkling = require('sparkling');

var app = express();
var reactive = sparkling(app);

app.use(reactive());
```

On client,

```js
import sparkling from 'sparking/client';

// configure
sparkling.reactiveCollections([
    'accounts',
    'leads',
    'opportunities'
]);

// create observable (returns RxJS Observable)
let updates = sparking.accounts.observable()
    .filter((e) => return e.action === 'updated')
    .debounce(500)
    .flatMap((e) => return e.data);

// subcribe to observable
updates.subcribe((account) => {
    // update DOM here
});
```

## Licence

MIT alexander.beletsky@gmail.com
