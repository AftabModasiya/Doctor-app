import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

export async function hashPassword(password: string): Promise<string> {
	const scryptAsync = promisify(scrypt);
	const salt = randomBytes(16).toString("hex");
	const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

	return `${salt}:${derivedKey.toString("hex")}`;
}

export async function comparePassword(
	password: string,
	storedHash: string,
): Promise<boolean> {
	const scryptAsync = promisify(scrypt);
	const [salt, key] = storedHash.split(":");

	const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

	return timingSafeEqual(Buffer.from(key, "hex"), derivedKey);
}
