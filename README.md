# @xailabs/electron-config

A helper for managing electron app configuration at compile-time and runtime.

<a href="https://xailabs.github.io/app-config/" target="_blank">Documentation</a>

## Example usage in electron app:

~/Desktop/config.json

```javascript
{
    "more": "stuff",
    "devstuff": {
        "development": "ok",
        "production": null
    }
}
```

src/config.js

```javascript
export default {
    foo: 'foo',
    bar: {
        development: 'baz!!!',
        production: 'bar'
    }
};
```


src/main.js

```javascript
import { app } from 'electron';
import { getConfig } from '@xailabs/app-config';
import defaultConfig from './config';

// take the config we have and extend it with values from the json file
const config = getConfig(defaultConfig, {
    
    // load this external file
    file: `${app.getPath('desktop')}/config.json`,  

    // if you find objects with `development` or `production` keys, resolve them
    resolve: process.env.NODE_ENV,                  

    // make the config read-only
    freeze: true                                    
});
```

console.log(config);


Resulting config in development build:

```javascript
{
    foo: 'foo',
    bar: 'baz!!!',
    more: 'stuff',
    devstuff: 'ok'
}
```

Resulting config in production build:

```javascript
{
    foo: 'foo',
    bar: 'bar',
    more: 'stuff',
    devstuff: null
}
```
