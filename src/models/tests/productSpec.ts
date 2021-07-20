import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model', () => {
    let newProduct: Product = { id: 0, name: '', price: 0, category: '' };
    let productAmount = 0;

    beforeAll(async () => {
        const result = await store.index();
        productAmount = result.length;
    });
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

    it('index method should return a list of products', async () => {
        const result = await store.index();
        productAmount = result.length;
    });
    it('create method should add create a product', async () => {
        const result = await store.create({
            name: 'Car',
            price: 10,
            category: 'Toy'
        } as Product);
        newProduct = result;

        expect(result.name).toEqual('Car');
        expect(result.price).toEqual(10);
        expect(result.category).toEqual('Toy');
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();

        expect(result.length).toBeGreaterThan(productAmount);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show((newProduct.id || 0).toString());

        expect(result).toEqual(newProduct);
    });

    it('delete method should remove the product', async () => {
        await store.delete((newProduct.id || 0).toString());
        const result = await store.index();

        expect(result.length).toEqual(productAmount);
    });
});
