System.register([], function(exports_1) {
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(email, password) {
                    if (email != undefined)
                        this._email = email;
                    if (password != undefined)
                        this._password = password;
                }
                User.prototype.getEmail = function () {
                    return this._email;
                };
                User.prototype.setEmail = function (email) {
                    this._email = email;
                };
                User.prototype.getPassword = function () {
                    return this._password;
                };
                User.prototype.setPassword = function (password) {
                    this._password = password;
                };
                return User;
            })();
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map