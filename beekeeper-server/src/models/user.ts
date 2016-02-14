var bcrypt = require('bcrypt-nodejs');

export class User {
    id : string;
    token : string;
    email : string;
    name : string;
    
    constructor(id, token, email, name) {
       this.id = id;
       this.token = token;
       this.email = email;
       this.name = name;
    }
}