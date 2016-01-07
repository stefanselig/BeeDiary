System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2;
    var BeeHiveService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            BeeHiveService = (function () {
                function BeeHiveService(http) {
                    //this.getBeeHives();
                }
                BeeHiveService.prototype.getBeeHives = function () {
                    this.beeHives = this.http
                        .get('http://localhost:8080/api/BeeHives/beeHives')
                        .map(function (response) { return response.json(); });
                };
                BeeHiveService.prototype.updateDiaryEntry = function (beeHive) {
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    // Somehow pass ID
                    this.http
                        .post('http://localhost:8080/api/BeeHives/beeHives', JSON.stringify(beeHive), {
                        headers: headers
                    }).subscribe(function (res) { return window.alert(res.json()); });
                };
                BeeHiveService.prototype.createDiaryEntry = function (beeHive) {
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http
                        .post('http://localhost:8080/api/BeeHives/beeHives', JSON.stringify(beeHive), {
                        headers: headers
                    }).subscribe(function (res) { return window.alert(res.json()); });
                };
                BeeHiveService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], BeeHiveService);
                return BeeHiveService;
                var _a;
            })();
            exports_1("BeeHiveService", BeeHiveService);
        }
    }
});
//# sourceMappingURL=beehive.service.js.map