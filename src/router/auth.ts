import express from 'express';

import { prisma, hashPassword, validatePassword } from '@util/globalFunc';
import { user } from '.prisma/client';

export const auth_router = express.Router({ caseSensitive: false });

// auth_router.use(function (req, res, next) {
// console.log('Time:', Date.now());
// console.log(req.body);
// next();
// });

auth_router.post('/login', async (req: express.Request, res: express.Response) => {
	const { id, password }: Login = req.body;
	await prisma.user
		.findFirst({ where: { id } })
		.then((e) => {
			if (e !== null) {
				if (validatePassword(password, e?.salt, e?.password)) {
					// ! remove sensible info
					delete e?.password;
					delete e?.salt;

					res.send({
						is_login: true,
						...e,
					});
				} else {
					res.send({ reason: 'incorrect password' });
				}
			} else {
				res.send({ reason: 'no matched id' });
			}
		})
		.catch((e) => {
			res.send({ reason: 'db problem' });
		});
});

auth_router.post('/signup', async (req: express.Request, res: express.Response) => {
	res.status(200);
	const { country, email, first_name, id, last_name, mobile, password }: SignUp = req.body;

	const { hash, salt } = hashPassword(password);

	await prisma.user
		.create({
			data: { country, email, first_name, id, last_name, password: hash, salt, mobile },
		})
		.then(() => {
			res.send({ isSuccess: true });
		});
});

interface SignUp {
	first_name: string;
	last_name: string;
	id: string;
	password: string;
	email: string;
	mobile: string;
	country: string;
}

interface Login {
	id: string;
	password: string;
}
