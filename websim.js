import * as http from 'http';
import * as fs from 'fs';
const fsPromises = fs.promises;
const host = '192.168.1.65';
const port = 8000;
const server = http.createServer();
const listFiles = {
	'/page/home/index.html': 'text/html',
	'/page/css/style.css': 'text/css',
	'/page/js/sim.js': 'text/javascript',
	'/page/js/ball.js': 'text/javascript',
	'/page/js/worker.js': 'text/javascript',
	'/page/js/geom.js': 'text/javascript'
}

server
	.on('request', (request, response) => {
		request.url = request.url.lastIndexOf('.') == -1 ? '/page/home/index.html' : request.url;
		fsPromises.readFile(`.${request.url}`)
			.then((content) => {
				let mimeType = listFiles[request.url] || 'application/octet-stream';
				response.writeHead(200, {'Content-Type' : mimeType});
				response.write(content);
				response.end();
			})
			.catch((err) => {
				response.writeHeader(404);
				response.end();
			})
	})
	.on('connection', (stream) => console.log('someone connected!'))
	.listen(port, host, () => console.log(`server running at http://${host}:${port}`));









































