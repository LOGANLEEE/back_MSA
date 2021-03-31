import express from 'express';

export const auth_router = express.Router({ caseSensitive: false });

auth_router.use(function (req, res, next) {
	console.log('Time:', Date.now());
	next();
});

auth_router.get('/', (req: express.Request, res: express.Response) => {
	res.send('auth!!');
});
