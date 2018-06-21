const { Users } = require('./users');

describe('- Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();

        users.users = [{
            id: 1,
            name: 'Josh',
            room: 'Room 1'
        },
        {
            id: 2,
            name: 'Kile',
            room: 'Room 2'
        },
        {
            id: 3,
            name: 'Mohamed',
            room: 'Room 1'
        }];
    });

    test('should add users', () => {
        const testUser = { id: 123, name: 'Test', room: 'RoomTest' };

        let users = new Users();

        users.addUser(testUser.id, testUser.name, testUser.room);

        expect(users.users).toMatchObject([testUser]);
    });

    test('should return users list for `Room 1`', () => {
        expect(users.getUsersList('Room 1')).toMatchObject(['Josh', 'Mohamed']);
    });

    test('should return users list for `Room 2`', () => {
        expect(users.getUsersList('Room 2')).toMatchObject(['Kile']);
    });

    test('should not return users list for incorrect room', () => {
        expect(users.getUsersList('Room 99')).toHaveLength(0);
    });

    test('should return user by id', () => {
        expect(users.getUser(2)).toMatchObject(users.users[1]);
    });

    test('should not return user by incorect id', () => {
        expect(users.getUser(99)).toBeFalsy();
    });

    test('should delete user and return deleted', () => {
        const userId = 1;
        let user = users.removeUser(userId);
        expect(user.id).toEqual(userId);
        expect(users.users).toHaveLength(2);
    });

    test('should not delete user', () => {
        const userId = 99;
        let user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users).toHaveLength(3);
    });
});