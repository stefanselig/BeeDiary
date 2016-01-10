System.register(['angular2/core', '../../user/user', '../services/userService'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_1, userService_1;
    var SignUpComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (userService_1_1) {
                userService_1 = userService_1_1;
            }],
        execute: function() {
            SignUpComponent = (function () {
                function SignUpComponent(userService) {
                    var _this = this;
                    this.user = new user_1.User();
                    this.userService = userService;
                    var instance = this;
                    // name, email, password
                    userService.people.subscribe(function (people) {
                        console.log(people);
                        console.log(people.message);
                        _this.user.setEmail(people.message);
                        //this.abc = people.message;
                        //console.log(this.abc);
                        console.log(_this.user.getEmail());
                    }, function (error) { return console.error("Error" + err); }, function () { return console.log("Completed"); });
                }
                SignUpComponent.prototype.onSubmit = function () {
                    console.log(this.user);
                    console.log(this.user._name);
                    console.log({
                        name: this.user._name,
                        email: this.user._email,
                        password: this.user._password
                    });
                    this.userService.createUser({
                        name: this.user._name,
                        email: this.user._email,
                        password: this.user._password
                    });
                };
                SignUpComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/signup/Templates/signup.template.html',
                        providers: [userService_1.UserService]
                    }), 
                    __metadata('design:paramtypes', [userService_1.UserService])
                ], SignUpComponent);
                return SignUpComponent;
            })();
            exports_1("SignUpComponent", SignUpComponent);
        }
    }
});
//# sourceMappingURL=signup.component.js.map