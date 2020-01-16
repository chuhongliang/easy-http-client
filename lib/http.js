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
	let method = opts.method;
	let url = opts.url;
	let params = opts.params;
	let options = initOptions(method, url, params);
	return options;
}

function verbFunc(verb) {
	let method = verb.toUpperCase()
	return function (url, params) {
		let { options, postData } = initOptions(method, url, params);
		return request(options, postData);
	}
}

function initOptions(method, urlstr, params) {
	if (!params) params = '';
	let postData = querystring.stringify(params);
	let url = URL.parse(urlstr);
	let protocol = url.protocol.replace(':', '');
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

