import { Order, OrderStore } from '../order';
import { User, UserStore } from '../user';
import { Product, ProductStore } from '../product';
import { OrderItem, OrderItemStore } from '../orderItem';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderItemStore = new OrderItemStore();

describe('Order Item Model', () => {
    // it('should have an index method', () => {
    //     expect(store.index).toBeDefined();
    // });

    it('should have a create method', () => {
        expect(orderItemStore.create).toBeDefined();
    });
    // it('should have a show method', () => {
    //     expect(orderItemStore.show).toBeDefined();
    // });
    // it('should have an add product method', () => {
    //     expect(orderItemStore.create).toBeDefined();
    // });

    // it('should have a update method', () => {
    //     expect(store.).toBeDefined();
    // });
    // it('should have a delete method', () => {
    //     expect(store.delete).toBeDefined();
    // });

    it('create method should create an order item', async () => {
        const newUser = await userStore.create({
            username: 'Capi@vara.com',
            firstname: 'Capi',
            lastname: 'Vara',
            password: 'password'
        } as User);
        const newProduct = await productStore.create({
            name: 'Car',
            price: 10,
            category: 'Toy'
        } as Product);
        const newOrder = await orderStore.create(newUser.id || 0);

        // const newUserId = newUser.id || 0;
        const newProductId = newProduct.id || 0;
        const newOrderId = newOrder.id || 0;

        const result = await orderItemStore.create(1, newOrderId, newProductId);

        expect(result.order_id).toEqual(newOrderId.toString());
        expect(result.product_id).toEqual(newProductId.toString());
        expect(result.quantity).toEqual(1);
        
    });
});
