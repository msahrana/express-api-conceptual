import type { Request, Response } from 'express';
import orderService from '../services/order.service';
import { sendResponse } from '../../utils/sendResponse';

// Create Single Order
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

// Get All Orders
export const getAllOrders = async (req: Request, res: Response) => {
    const allOrders = await orderService.getAllOrders();

    return sendResponse(res, {
        message: 'Orders retrieved successfully',
        data: allOrders,
    });
};

// Get Single Order
export const getSingleOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const singleOrder = await orderService.getSingleOrder(id as string);

    if (!singleOrder) {
        return res.status(404).json({
            success: false,
            message: 'Order not found',
        });
    }

    return sendResponse(res, {
        message: 'Single Order received successfully',
        data: singleOrder,
    });
};

// Update Single Order
export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    const payload = req.body;

    if (!user) {
        return sendResponse(res, {
            message: 'Unauthorized',
        });
    }

    if (!id) {
        return sendResponse(res, {
            message: 'Order ID is required',
        });
    }

    const updateOneOrder = await orderService.updateSingleOrder(
        payload,
        id as string,
    );

    if (!updateOneOrder) {
        return sendResponse(res, {
            message: 'Order not found',
        });
    }

    return sendResponse(res, {
        message: 'Single Order updated successfully',
        data: updateOneOrder,
    });
};

// Delete Single Order
export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
        return sendResponse(res, {
            message: 'Unauthorized',
        });
    }

    const deleteOrder = await orderService.deleteSingleOrder(id as string);

    if (!deleteOrder) {
        return sendResponse(res, {
            message: 'Order not found yet!!!',
        });
    }

    return sendResponse(res, {
        message: 'Single Order Delete Successfully!',
    });
};

// Delete All Orders
export const deleteAllOrder = async (req: Request, res: Response) => {
    const deleteResult = await orderService.deleteAllOrders();

    if (deleteResult.length === 0) {
        return sendResponse(res, {
            message: 'No Order found here...!!!',
        });
    }

    sendResponse(res, {
        message: 'All orders deleted successfully',
    });
    return deleteResult;
};
