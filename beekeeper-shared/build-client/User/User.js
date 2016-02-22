System.register([], function(exports_1) {
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(googleId, email, token, name) {
                    this.googleId = googleId;
                    this.email = email;
                    this.token = token;
                    this.name = name;
                }
                return User;
            })();
            exports_1("User", User);
        }
    }
});
