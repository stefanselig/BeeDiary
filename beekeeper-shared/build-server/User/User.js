"use strict";
var User = (function () {
    function User(googleId, email, token, name) {
        this.googleId = googleId;
        this.email = email;
        this.token = token;
        this.name = name;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map