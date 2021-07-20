import request from 'request';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { Product } from '../../models/product';

describe("User Server Endpoints", () => {
    let token: string = '';
    let userId: number = 0;
    let productId: number = 0;
    beforeAll(() => {
        require('../../server');
    });
    describe("POST /users", () => {
        const data: { status: number } = { status: 0 };
        beforeAll((done) => {
            request.post({
                url: "http://localhost:3000/users",
                body: {
                    "username": "capi@sashi.com",
                    "firstname": "Capi",
                    "lastname": "Sashi",
                    "password": "password"
                },
                json: true
            }, (_, response: request.Response, body: string) => {
                data.status = response.statusCode;
                token = 'Bearer ' + body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });
    describe("GET /users", () => {
        const data: { status: number, users: User[] } = { status: 0, users: [] };
        beforeAll((done) => {
            request.get({
                url: "http://localhost:3000/users",
                headers: {
                    'authorization': token
                }
            }, (_, response: request.Response, body: string) => {
                data.status = response.statusCode;
                data.users = JSON.parse(body) as User[];
                userId = data.users[0].id || 0;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body should cotain 1 user", () => {
            expect(data.users.length).toBe(1);
        });
    });
    describe("GET /users", () => {
        const data: { status: number } = { status: 0 };
        beforeAll((done) => {
            request.get({
                url: "http://localhost:3000/users"
            }, (_, response: request.Response) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 401", () => {
            expect(data.status).toBe(401);
        });
    });
    describe(`GET /users/${userId}`, () => {
        const data: { status: number } = { status: 0 };
        beforeAll((done) => {
            request.get({
                url: `http://localhost:3000/users/${userId}`,
                headers: {
                    'authorization': token
                }
            }, (_, response: request.Response, body: string) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });


    describe("POST /products", () => {
        const data: { status: number } = { status: 0 };
        beforeAll((done) => {
            request.post({
                url: "http://localhost:3000/products",
                headers: {
                    'authorization': token
                },
                body: {
                    "name": "Car",
                    "price": 10,
                    "category": "toy"
                },
                json: true
            }, (_, response: request.Response, body: string) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });
    describe("GET /products", () => {
        const data: { status: number } = { status: 0 };
        beforeAll((done) => {
            request.get({
                url: "http://localhost:3000/products"
            }, (_, response: request.Response, body: string) => {
                data.status = response.statusCode;
                const products = JSON.parse(body) as User[];
                productId = products[0].id || 0;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });
    describe(`GET /products/${productId}`, () => {
        const data: { status: number } = { status: 0 };
        beforeAll((done) => {
            request.get({
                url: `http://localhost:3000/products/${productId}`
            }, (_, response: request.Response, body: Product) => {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });


    describe("POST /orders", () => {
        const data: { status: number, order: Order } = { status: 0, order: { id: 0, status: '', user_id: '' } };
        beforeAll((done) => {
            request.post({
                url: "http://localhost:3000/orders",
                headers: {
                    'authorization': token
                },
                body: {
                    "user_id": 1
                },
                json: true
            }, (_, response: request.Response, body: Order) => {
                data.status = response.statusCode;
                data.order = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Response payload should contain an order", () => {
            expect(data.order.id).toBe(1);
        });
    });
    



    // describe("DELETE /users/1", () => {
    //     const data: { status: number } = { status: 0 };
    //     beforeAll((done) => {
    //         request.delete({
    //             url: "http://localhost:3000/users/1",
    //             headers: {
    //                 'authorization': token
    //             }
    //         }, (_, response: request.Response) => {
    //             data.status = response.statusCode;
    //             done();
    //         });
    //     });
    //     it("Status 200", () => {
    //         expect(data.status).toBe(200);
    //     });
    // });
});