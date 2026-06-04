import { sql } from '../../db';
import bcrypt from 'bcrypt';
import type { OUser, TUser } from '../../types';

class AuthService {
    private async hashPassword(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    private async comparePassword(
        password: string,
        hash: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
    // Signup Single User
    async createUserIntoDB(user: OUser & { password: string }) {
        const { name, email, password, age, role } = user;

        const passwordHash = await this.hashPassword(password);

        const result = await sql`
            INSERT INTO users (name, email, password_hash, age, role)
            VALUES (${name}, ${email}, ${passwordHash}, ${age}, COALESCE(${role}, 'user'))
            RETURNING id, name, email, age, role, created_at, updated_at
        `;
        return result[0];
    }

    // Login Single User
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

    // Get Single User ById
    async getUserById(userId: string) {
        const result = await sql`
        SELECT id, name, email, age, role FROM users WHERE id=${userId}
        `;
        return result[0] as OUser & { id: string };
    }

    // Update Single User
    async updateUser(
        userId: string,
        updates: Partial<OUser> & { password?: string },
    ) {
        const { name, email, age, role, password } = updates;
        let passwordHash: string | undefined;
        if (password) {
            passwordHash = await this.hashPassword(password);
        }

        const result = await sql`
        UPDATE users
        SET 
            name = COALESCE(${name}, name),
            email = COALESCE(${email}, email),
            age = COALESCE(${age}, age),
            role = COALESCE(${role}, role),
            password_hash = COALESCE(${passwordHash}, password_hash),
            updated_at = NOW()
        WHERE id = ${userId}
        RETURNING id, name, email, age, role, created_at, updated_at
        `;
        return result[0];
    }
}

export default new AuthService();
