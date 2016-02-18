var bcrypt = require('bcrypt-nodejs');
var User = (function () {
    function User(id, token, email, name) {
        this.id = id;
        this.token = token;
        this.email = email;
        this.name = name;
    }
    return User;
})();
exports.User = User;
//# sourceMappingURL=User.js.map