import express, { Request, Response } from 'express';
import { Order, OrderProduct, OrderStore } from '../models/order';

const store = new OrderStore();

// const index = async (_req: Request, res: Response) => {
//     const products = await store.index();
//     res.json(products);
// }

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.body.id);
    res.json(product);
}

const create = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.user_id;
        console.log(user_id)

        const newProduct = await store.create(user_id);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

// const destroy = async (req: Request, res: Response) => {
//     const deleted = await store.delete(req.body.id)
//     res.json(deleted)
// }

const addProduct = async (_req: Request, res: Response) => {
    const orderId: number = parseInt(_req.params.id);
    const productId: number = parseInt(_req.body.productId);
    const quantity: number = parseInt(_req.body.quantity);

    try {
        const addedProduct: OrderProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}


const orderRoutes = (app: express.Application) => {
    // app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    // add product
    app.post('/orders/:id/products', addProduct)
}

export default orderRoutes;