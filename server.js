const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
};

const path = require('path');
const static = 'static';
const basePath = path.join(__dirname, static);
const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000;

http.createServer(function (req, res) {
    const filePath = path.join(basePath, req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.writeHead(200, { 'Access-Control-Allow-Origin': "*" });

    const stream = fs.createReadStream(filePath);
    stream.on('error', function () {
        res.writeHead(404);
        res.end();
    });
    stream.pipe(res);
}).listen(port);