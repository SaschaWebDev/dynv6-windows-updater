import 'dotenv/config';
import express from 'express';
import Helmet from 'helmet';
import IP from 'ip';
import Morgan from 'morgan';
import cron from 'node-cron';
import fetch from 'node-fetch';

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

const updateDynv6 = async (IPv6: string) => {
	console.log('Updating dynv6.com...');
	const updateURL = `http://dynv6.com/api/update?hostname=${process.env.DYNV6_HOST_NAME}&ipv6=${IPv6}&token=${process.env.DYNV6_TOKEN}`;
	const response = await fetch(updateURL, {
		method: 'get',
	});
	return response.status === 200;
};

const getExternalIPv6 = async () => {
	console.log('Fetching external IPv6 address...');
	const response = await fetch(`http://api6.ipify.org`, {
		method: 'get',
	});
	const fetchedExternalIPv6 = await response.text();
	return response.status === 200 && IP.isV6Format(fetchedExternalIPv6)
		? fetchedExternalIPv6
		: '';
};

const tryUpdateDynv6 = async () => {
	const IPv6Address = await getExternalIPv6();
	if (IPv6Address) {
		console.log('External IPv6: ', IPv6Address);
		const updateResponse = await updateDynv6(IPv6Address);
		updateResponse
			? console.log('IPv6 UPDATE FOR DYNV6.COM SUCCESSFULL')
			: console.log('IPv6 UPDATE FOR DYNV6.COM FAILED');
	} else {
		console.log('External IPv6 could not be fetched');
	}
};

cron.schedule('*/10 * * * *', () => tryUpdateDynv6()).start();
