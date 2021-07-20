import Client from './../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env;

export type User = {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(p: User): Promise<User> {
        try {
            const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS as string));
            const password = bcrypt.hashSync(
                p.password + BCRYPT_PASSWORD,
                salt
            );
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [p.username, p.firstname, p.lastname, password]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new user ${p.firstname} + ${p.lastname}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User> {
        const conn = await Client.connect()
        const sql = 'SELECT password FROM users WHERE username=($1)'

        const result = await conn.query(sql, [username])

        if (result.rows.length) {

            const user: User = result.rows[0]

            if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                return user
            } else {
                throw new Error(`Wrong password provided for user ${username}`)
            }
        } else {
            throw new Error(`${username} does not exist`);
        }
    }
}
