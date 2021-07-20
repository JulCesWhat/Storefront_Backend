import { Order, OrderStore } from '../order';
import { User, UserStore } from '../user';
import { Product, ProductStore } from '../product';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Order Model', () => {
    // it('should have an index method', () => {
    //     expect(store.index).toBeDefined();
    // });

    it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
    });
    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });

    // it('should have a update method', () => {
    //     expect(store.).toBeDefined();
    // });
    // it('should have a delete method', () => {
    //     expect(store.delete).toBeDefined();
    // });

    it('create method should create an order', async () => {
        const newUser = await userStore.create({
            username: 'Capi@vara.com',
            firstname: 'Capi',
            lastname: 'Vara',
            password: 'password'
        } as User);

        const result = await orderStore.create(newUser.id || 0);

        expect(result.status).toEqual('open');
        expect(result.user_id).toEqual((newUser.id || 0).toString());
    });
    // it('index method should return a list of products', async () => {
    //     const result = await store.index();

    //     expect(result).toEqual([
    //         {
    //             id: 1,
    //             name: 'Car',
    //             price: 10,
    //             category: 'Toy'
    //         }
    //     ]);
    // });
    // it('show method should return the correct order', async () => {
    //     const result = await store.show("1");

    //     expect(result).toEqual({
    //         id: 1,
    //         status: 'open',
    //         user_id: 1
    //     });
    // });

    // it('delete method should remove the product', async () => {
    //     await store.delete("1");
    //     const result = await store.index();

    //     expect(result).toEqual([]);
    // });
});
