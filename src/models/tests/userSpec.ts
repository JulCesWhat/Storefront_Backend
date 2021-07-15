import { User, UserStore } from './../user';

const store = new UserStore();

describe('User Model', () => {
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

    it('create method should add a user', async () => {
        const result = await store.create({
            firstname: 'Capi',
            lastname: 'Vara',
            password: 'password'
        } as User);

        expect(result).toEqual({
            id: 1,
            firstname: 'Capi',
            lastname: 'Vara',
            password: 'password'
        });
    });
    it('index method should return a list of users', async () => {
        const result = await store.index();

        expect(result).toEqual([
            {
                id: 1,
                firstname: 'Capi',
                lastname: 'Vara',
                password: 'password'
            }
        ]);
    });
    it('show method should return the correct user', async () => {
        const result = await store.show("1");

        expect(result).toEqual({
            id: 1,
            firstname: 'Capi',
            lastname: 'Vara',
            password: 'password'
        });
    });

    it('delete method should remove the user', async () => {
        await store.delete("1");
        const result = await store.index();
        
        expect(result).toEqual([]);
    });
});
