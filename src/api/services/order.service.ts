import { sql } from '../../db';
import type { OOrder } from '../../types';
import authService from './auth.service';

class OrderService {
    // Create Single Order
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

    // Get All Orders
    async getAllOrders() {
        const result = await sql`
        SELECT * FROM orders
        `;
        return result;
    }

    // Get Single Order
    async getSingleOrder(id: string) {
        const result = await sql`
        SELECT * FROM orders WHERE id = ${id}
    `;
        return result[0] || null;
    }

    // Update Single Order
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

    // Delete Single Order
    async deleteSingleOrder(id: string) {
        const result = await sql`
        DELETE FROM orders 
        WHERE id = ${id}
        RETURNING *
        `;
        [id];
        return result[0] || null;
    }

    // Delete All Orders
    async deleteAllOrders() {
        const result = await sql`
        DELETE FROM orders 
        RETURNING *
        `;
        return result;
    }
}

export default new OrderService();
