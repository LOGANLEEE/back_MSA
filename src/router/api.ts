import express from 'express';

export const api_router = express.Router({ caseSensitive: false });

api_router.use(function (req, res, next) {
	console.log('Time:', Date.now());
	next();
});

api_router.get('/', (req: express.Request, res: express.Response) => {
	res.send('api!!');
});
