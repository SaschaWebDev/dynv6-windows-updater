import 'dotenv/config';
import express from 'express';
import Helmet from 'helmet';
import http from 'http';
import IP from 'ip';
import Morgan from 'morgan';

const server = express();
const port = process.env.PORT || 8000;

server.use(Helmet());
server.use(express.json());
server.use(Morgan('dev'));
server.disable('etag');
server.set('json spaces', 4);

server.get('/', (req, res) =>
	res.status(200).json({
		message: `dynv6-windows-updater is running`,
	})
);

server.listen(port, () =>
	console.log(`dynv6-windows-updater started on port ${port}`)
);

const logIP = (myIp: Object) => console.table(`FETCHED ${myIp}`);

http.get({ host: 'api6.ipify.org', port: 80, path: '/' }, (response) =>
	response.on(
		'data',
		(ip: Object) => IP.isV6Format(String(ip)) && logIP(String(ip))
	)
);
