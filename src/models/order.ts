import Client from '../database';
import { OrderItem } from './orderItem';

export type Order = {
    id?: number;
    status: string;
    user_id: string;
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
}
