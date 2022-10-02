import 'dotenv/config';
import express from 'express';
import Helmet from 'helmet';
import Morgan from 'morgan';

const server = express();
const port = process.env.PORT || 8000;

server.use(Helmet());
server.use(express.json());
server.use(Morgan('dev'));
server.disable('etag');
server.set('json spaces', 4);

server.get('/status', (req, res) => {
	res.status(200).json({
		message: `dynv6-windows-updater is running`,
	});
});

server.listen(port, () =>
	console.log(`dynv6-windows-updater started on port ${port}`)
);
