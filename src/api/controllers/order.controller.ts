import type { Request, Response } from 'express';
import orderService from '../services/order.service';
import { sendResponse } from '../../utils/sendResponse';

export const createOrder = async (req: Request, res: Response) => {
    const { quantity, food, price } = req.body;
    const newOrder = await orderService.createOrder({
        customer_id: req.user.id,
        quantity,
        food,
        price,
    });

    return sendResponse(res, {
        message: 'Order created successfully',
        data: newOrder,
    });
};
