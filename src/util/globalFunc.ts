import { PrismaClient } from '@prisma/client';
import { randomBytes, pbkdf2Sync } from 'crypto';
export const prisma = new PrismaClient();

export const hashPassword = (password: string) => {
	const salt = randomBytes(16).toString('hex');
	const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

	return {
		salt: salt,
		hash: hash,
	};
};

export const validatePassword = (passwrod: string, salt: string, hash: string) => {
	// To verify the same - salt (stored in DB) with same other parameters used while creating hash (1000 iterations, 64 length and sha512 digest)
	const targetHash = pbkdf2Sync(passwrod, salt, 1000, 64, 'sha512').toString('hex');

	// check if hash (stored in DB) and newly generated hash (newHash) are the same
	return hash === targetHash;
};
