import { Product, ProductStore } from './../product';

const store = new ProductStore();

describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    // it('should have a update method', () => {
    //     expect(store.).toBeDefined();
    // });
    // it('should have a delete method', () => {
    //     expect(store.delete).toBeDefined();
    // });

    it('create method should add create a product', async () => {
        const result = await store.create({
            name: 'Car',
            price: 10,
            category: 'Toy'
        } as Product);

        expect(result).toEqual({
            id: 2,
            name: 'Car',
            price: 10,
            category: 'Toy'
        });
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();

        expect(result.length).toEqual(2);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show("2");

        expect(result).toEqual({
            id: 2,
            name: 'Car',
            price: 10,
            category: 'Toy'
        });
    });

    it('delete method should remove the product', async () => {
        await store.delete("2");
        const result = await store.index();

        expect(result.length).toEqual(1);
    });
});
