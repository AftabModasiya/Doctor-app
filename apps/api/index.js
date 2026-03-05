const http = require('http');

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(
		JSON.stringify({
			message: 'API is running',
			time: new Date().toISOString(),
		}),
	);
});

server.listen(PORT, () => {
	console.log(`🚀 API server running on http://localhost:${PORT}`);
});
