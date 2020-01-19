# eop-http
> 一个简单的http请求库

### Installation
```
npm install eop-http
```

### Usage
```
const { http, curl } = require('eop-http');

http.get('http://127.0.0.1:3000')
  .then(function (res) {
    console.log('res=>', res);
  }).catch(function (err) {
    console.log('err=>', err);
  });


curl({
    method: 'post',
    url: 'https://127.0.0.1:3000/v1/user'
  })
  .then(function (res) {
    console.log('res=>', res);
  }).catch(function (err) {
    console.log('err=>', err);
  });
``` 