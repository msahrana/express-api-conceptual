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

    async getAllOrders() {
        const result = await sql`
        SELECT * FROM orders
        `;
        return result;
    }

    async getSingleOrder(id: string) {
        const result = await sql`
        SELECT * FROM orders WHERE id = ${id}
    `;
        return result[0] || null;
    }

    async updateSingleOrder(payload: any, id: string) {
        const result = await sql`
        UPDATE orders
        SET
            customer_id = COALESCE(${payload.customer_id}, customer_id),
            quantity = COALESCE(${payload.quantity}, quantity),
            food = COALESCE(${payload.food}, food),
            price = COALESCE(${payload.price}, price),
            updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
    `;
        return result[0] || null;
    }
}

export default new OrderService();
