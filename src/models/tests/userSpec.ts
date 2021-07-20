import { User, UserStore } from '../user';

const store = new UserStore();

describe('User Model', () => {
    let newUser: User = { id: 0, username: '', firstname: '', lastname: '', password: '' };
    let userAmount = 0;

    beforeAll(async () => {
        const result = await store.index();
        userAmount = result.length;
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

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should create a user', async () => {
        const result = await store.create({
            username: 'Capi@vara.com',
            firstname: 'Capi',
            lastname: 'Vara',
            password: 'password'
        } as User);
        newUser = result as User;

        expect(result.username).toEqual('Capi@vara.com');
        expect(result.firstname).toEqual('Capi');
        expect(result.lastname).toEqual('Vara');
    });
    it('index method should return a list of users', async () => {
        const result = await store.index();

        expect(result.length).toBeGreaterThan(userAmount);
    });
    it('show method should return the correct user', async () => {
        const result = await store.show((newUser.id || 0).toString());

        expect(result).toEqual(newUser);
    });

    it('delete method should remove the user', async () => {
        await store.delete((newUser.id || 0).toString());
        const result = await store.index();

        expect(result.length).toEqual(userAmount);
    });
});
