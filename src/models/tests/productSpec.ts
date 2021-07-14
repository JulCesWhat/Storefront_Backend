import { Product, ProductStore } from './../product';

const store = new ProductStore();

describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    //   it('should have a update method', () => {
    //     expect(store.).toBeDefined();
    //   });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('index method should return a list of books', async () => {
        const result = await store.index();
        console.log(result);
        // expect(result).toEqual([{
        //   id: "1",
        //   title: 'Bridge to Terabithia',
        //   total_pages: 250,
        //   author: 'Katherine Paterson',
        //   type: 'Childrens'
        // }]);
      });

    it('create method should add a product', async () => {
        console.log('cpai');
        const result = await store.create({
            name: 'Car',
            price: 10,
            category: 'Toy'
        } as Product);
        expect(result).toEqual({
            name: 'Bridge to Terabithia',
            price: 250,
            category: 'Katherine Paterson'
        });
    });
});
