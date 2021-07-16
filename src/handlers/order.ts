import express, { Request, Response } from 'express';
import { Order, OrderProduct, OrderStore } from '../models/order';

const store = new OrderStore();

// const index = async (_req: Request, res: Response) => {
//     const products = await store.index();
//     res.json(products);
// }

// const show = async (req: Request, res: Response) => {
//     const product = await store.show(req.body.id);
//     res.json(product);
// }

// const create = async (req: Request, res: Response) => {
//     try {
//         const product: Product = {
//             name: req.body.name,
//             price: req.body.price,
//             category: req.body.category || '',
//         };

//         const newProduct = await store.create(product);
//         res.json(newProduct);
//     } catch (err) {
//         res.status(400);
//         res.json(err);
//     }
// }

// const destroy = async (req: Request, res: Response) => {
//     const deleted = await store.delete(req.body.id)
//     res.json(deleted)
// }

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)

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
    // app.get('/orders/:id', show)
    // app.post('/orders', create)
    // add product
    app.post('/orders/:id/products', addProduct)
}

export default orderRoutes;