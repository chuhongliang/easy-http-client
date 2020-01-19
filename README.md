# eop-http
> 一个简单的http请求库

### Installation
```
npm install eop-http
```

### Usage
``` javascript
const { http, curl } = require('eop-http');

http.get('http://127.0.0.1:3000', { name: 'aa' })
  .then(function (res) {
		console.log('res=>', res);
  }).catch(function (err) {
    console.log('err=>', err);
  });

let opts = {
  method: 'post',
  url: 'https://127.0.0.1:3000/v1/user'
}
curl(opts)
  .then(function (res) {
    console.log('res=>', res);
  }).catch(function (err) {
    console.log('err=>', err);
  });
``` 