import Client from '../database';

export type Order = {
    id?: number;
    status: string;
    user_id: string;
}

export type OrderProduct = {
    id?: number;
    quantity: number;
    order_id: string;
    product_id: string;
}

export class OrderStore {

    async show(id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`);
        }
    }

    async create(userId: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
            const result = await conn.query(sql, ['open', userId]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new order ${userId}. Error: ${err}`);
        }
    }

    async addProduct(quantity: number, orderId: number, productId: number): Promise<OrderProduct> {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(ordersql, [orderId])
            const order = result.rows[0]

            conn.release()

            if (order.status !== "open") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'INSERT INTO order_items (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            const result = await conn
                .query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}
