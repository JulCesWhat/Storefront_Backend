import Client from '../database';

export type OrderItem = {
    id?: number;
    quantity: number;
    order_id: string;
    product_id: string;
}

export class OrderItemStore {
    async create(quantity: number, orderId: number, productId: number): Promise<OrderItem> {
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
