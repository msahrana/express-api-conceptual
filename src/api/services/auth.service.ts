import { sql } from '../../db';
import bcrypt from 'bcrypt';
import type { OUser, TUser } from '../../types';

class AuthService {
    async createUserIntoDB(user: OUser & { password: string }) {
        const { name, email, password, age, role } = user;

        const hash = await bcrypt.hash(password, 10);

        const result = await sql`
            INSERT INTO users (name, email, password_hash, age, role)
            VALUES (${name}, ${email}, ${hash}, ${age}, COALESCE(${role}, 'user'))
            RETURNING id, name, email, age, role, created_at, updated_at
        `;
        return result[0];
    }

    async loginUserIntoDB(email: string, password: string) {
        const result = await sql`
        SELECT * FROM users WHERE email = ${email}
        `;

        if (!result.length) {
            return null;
        }

        const { password_hash, ...user } = result[0] as TUser;
        const isValid = await bcrypt.compare(password, password_hash);

        return isValid ? user : null;
    }

    async getUserById(id: string) {
        const result = await sql`
        SELECT id, name, email, age, role FROM users WHERE id=${id}
        `;
        return result[0] as OUser & { id: number };
    }
}

export default new AuthService();
