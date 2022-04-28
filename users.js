class Users {
    constructor() {
      // we use an in-memory "database"; this isn't persistent but is easy
      // default user
        this.users = { emery: 'compsci326' };
    }
  
    // Returns true iff the user exists.
    findUser(email) {
        if (!this.users[email]) {
            return false;
        } else {
            return true;
        }
    }
  
    // Returns true iff the password is the one we have stored (in plaintext = bad
    // but easy).
    validatePassword(email, pwd) {
        if (!this.findUser(email)) {
            return false;
        }
        if (this.users[email] !== pwd) {
            return false;
        }
        return true;
    }
  
    // Add a user to the "database".
    addUser(email, pwd) {
        if (this.findUser(email)) {
            return false;
        }
        this.users[email] = pwd;
        return true;
    }
}
  
export default new Users();