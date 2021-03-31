import 'module-alias/register';

import express from 'express';
import oauth2orize from 'oauth2orize';
import cookie_parser from 'cookie-parser';
import body_parser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import errorhandler from 'errorhandler';
import { api_router } from '@router/api';
import { auth_router } from '@router/auth';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

const app: express.Application = express();
const port: number = parseInt((process.env.PORT || 4000) as string, 10);

app.use(cors());
app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(errorhandler());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api_router);
app.use('/auth', auth_router);

https
	.createServer(
		{
			key: fs.readFileSync('./ssl/localhost.key'),
			cert: fs.readFileSync('./ssl/localhost.crt'),
		},
		app,
	)
	.listen(port, () => {
		console.log(`Example app listening at https://localhost:${port}`);
	});

// app.listen(port, () => {
// 	console.log(`Example app listening at https://localhost:${port}`);
// });
