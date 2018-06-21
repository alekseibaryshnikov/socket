class Users {
    constructor() {
        this.users = [];
    }

    /**
     * Add user in the list
     * @param {*} id 
     * @param {*} name 
     * @param {*} room 
     * @return {*} user
     */
    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }

    /**
     * Remove user from user list via id
     * @param {*} id 
     */
    removeUser(id) {
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    /**
     * Return user object via id
     * @param {*} id 
     */
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    /**
     * Get user list for current room
     * @param {*} room 
     */
    getUsersList(room) {
        let roomUsers = this.users.filter((user) => user.room === room);

        return roomUsers.map((user) => user.name);
    }
}

module.exports = { Users };