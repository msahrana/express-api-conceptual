import { sql } from '../../db';
import type { OOrder } from '../../types';
import authService from './auth.service';

class OrderService {
    async createOrder({ customer_id, quantity, food, price }: OOrder) {
        const user = await authService.getUserById(String(customer_id));
        if (!user) {
            throw new Error('User not found!');
        }

        await sql`
        INSERT INTO orders (customer_id, quantity, food, price )
        VALUES (${customer_id}, ${quantity}, ${food}, ${price})
        RETURNING *
        `;
    }
}

export default new OrderService()