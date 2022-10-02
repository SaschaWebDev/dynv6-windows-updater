require('dotenv').config();

const server = require('./server');

server.listen(process.env.PORT || 5000, () =>
	console.log(
		`dynv6-windows-updater started on port ${process.env.PORT || 5000}`
	)
);
