System.register(['angular2/core', 'angular2/router', '../services/beehive.service', '../services/maps.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, router_2, beehive_service_1, maps_service_1;
    var EditBeeHiveComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (beehive_service_1_1) {
                beehive_service_1 = beehive_service_1_1;
            },
            function (maps_service_1_1) {
                maps_service_1 = maps_service_1_1;
            }],
        execute: function() {
            EditBeeHiveComponent = (function () {
                function EditBeeHiveComponent(beeHiveService, mapsService, router, params) {
                    this.beehiveService = beeHiveService;
                    this.mapsService = mapsService;
                    this.router = router;
                    this.loadSelectedBeeHiveFromWebService(params.get('id'));
                }
                EditBeeHiveComponent.prototype.loadSelectedBeeHiveFromWebService = function (id) {
                    var _this = this;
                    this.beehive = this.beehiveService.getBeeHiveById(id).subscribe(function (selectedBeeHive) { return _this.beehive = selectedBeeHive; }, function (error) { return console.error("Error" + error); }, function () {
                        console.log("Completed");
                        console.log(_this.beehive);
                    });
                };
                EditBeeHiveComponent.prototype.callGetCoordinates = function (index) {
                    var _this = this;
                    this.mapsService.getCoordinates(function (locParam) {
                        _this.beehive.location.lat = locParam.lat;
                        _this.beehive.location.long = locParam.long;
                    });
                };
                EditBeeHiveComponent.prototype.updateBeeHive = function () {
                    //this.beehiveService.updateBeeHive(this.beehive);
                    this.router.navigate(['BeeHive']);
                };
                EditBeeHiveComponent.prototype.cancel = function () {
                    this.router.navigate(['BeeHive']);
                };
                EditBeeHiveComponent = __decorate([
                    core_1.Component({
                        selector: 'editBeeHive',
                        templateUrl: 'app/beehive/Templates/editBeehive.template.html',
                        providers: [beehive_service_1.BeeHiveService, maps_service_1.MapsService]
                    }), 
                    __metadata('design:paramtypes', [beehive_service_1.BeeHiveService, maps_service_1.MapsService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_2.RouteParams !== 'undefined' && router_2.RouteParams) === 'function' && _b) || Object])
                ], EditBeeHiveComponent);
                return EditBeeHiveComponent;
                var _a, _b;
            })();
            exports_1("EditBeeHiveComponent", EditBeeHiveComponent);
        }
    }
});
//# sourceMappingURL=editBeeHive.component.js.map