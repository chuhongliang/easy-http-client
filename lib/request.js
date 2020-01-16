
const http = require('http');
const https = require('https');


module.exports = function (options, postData) {
	let protocol = options.protocol;
	return protocols[protocol](options, postData);
}

let protocols = {}

protocols.http = function (options, postData) {
	options.protocol += ':';
	return new Promise(function (resolve, reject) {
		let req = http.request(options, function (res) {
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
		req.write(postData);
		req.end();
	}).catch(err => {
		console.log(err);
	});
}

protocols.https = function (options) {

}
