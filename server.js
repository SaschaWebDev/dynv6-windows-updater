const express = require('express');

const server = express();
const helmet = require('helmet');
const logger = require('morgan');

server.use(helmet());
server.use(express.json());
server.use(logger('dev'));
server.disable('etag');
server.set('json spaces', 4);

server.get('/', (req, res) => {
	res.status(200).json({
		message: `dynv6-windows-updater is running`,
	});
});

module.exports = server;
