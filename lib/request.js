
const http = require('http');
const https = require('https');
const protocols = {
	'http': http,
	'https': https
}

module.exports = function (options, postData) {
	let protocol = options.protocol.replace(':', '');
	let proxy = protocols[protocol];
	return new Promise(function (resolve, reject) {
		let req = proxy.request(options, function (res) {
			res.setEncoding('utf8');
			let data = '';
			res.on('data', function (chunk) {
				if (chunk) data += chunk;
			});
			res.on('end', function (chunk) {
				if (chunk) data += chunk;
				resolve(data);
			});
		});
		req.on('error', function (err) {
			reject(err);
		});
		if (postData) req.write(postData);
		req.end();
	}).catch(err => {
		console.log(err);
	});
}

