const URL = require('url');
const Http = require('http');
const Https = require('https');
const querystring = require('querystring');
const request = require('./request');
const methods = ['get', 'post', 'put', 'delete'];
const http = {};
const agents = {
	http: new Http.Agent({
		keepAlive: true,
		keepAliveMsecs: 1000,
		maxSockets: 4,
		maxFreeSockets: 2
	}),
	https: new Https.Agent({
		keepAlive: true,
		keepAliveMsecs: 1000,
		maxSockets: 4,
		maxFreeSockets: 2
	}),
}
const ports = {
	http: 80,
	https: 443,
}

module.exports = { http, curl }

methods.forEach((method) => {
	http[method] = verbFunc(method);
});

function curl(opts) {
	let type = typeof opts;
	if (type === 'string') {
		let { options, postData } = initOptions('GET', opts);
		return request(options, postData);
	} else if (type === 'object') {
		let method = opts.method.toUpperCase();
		if (!method) {
			throw new Error('method is undefined');
		}
		let flag = methods.some((value) => {
			return value.toUpperCase() === method.toUpperCase();
		});
		if (!flag) {
			throw new Error('method is not support');
		}
		let url = opts.url;
		let params = opts.params || '';
		let { options, postData } = initOptions(method, url, params);
		return request(options, postData);
	} else {
		throw new TypeError('opts type error, type must be string or object');
	}
}

function verbFunc(verb) {
	let method = verb.toUpperCase();
	return function (url, params) {
		let { options, postData } = initOptions(method, url, params);
		return request(options, postData);
	}
}

function initOptions(method, urlstr, params) {
	method = method || 'GET';
	if (!params) params = '';
	let postData = querystring.stringify(params);
	let url = URL.parse(urlstr);
	let protocol = url.protocol;
	let port = url.port || ports[protocol];
	let agent = agents[protocol];

	let options = {
		protocol: protocol,
		host: url.hostname,
		port: port,
		path: url.path,
		method: method,
		agent: agent,
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded',
			"Content-Length": Buffer.byteLength(postData)
		}
	};
	return { options, postData };
}

