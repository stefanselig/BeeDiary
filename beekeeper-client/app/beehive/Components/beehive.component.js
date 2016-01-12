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
    var core_1, router_1, beehive_service_1, maps_service_1;
    var BeeHiveComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (beehive_service_1_1) {
                beehive_service_1 = beehive_service_1_1;
            },
            function (maps_service_1_1) {
                maps_service_1 = maps_service_1_1;
            }],
        execute: function() {
            BeeHiveComponent = (function () {
                function BeeHiveComponent(beeHiveService, mapsService, router) {
                    this.beehives = [];
                    this.beehiveService = beeHiveService;
                    this.mapsService = mapsService;
                    this.router = router;
                    this.beehives.push({
                        number: 1,
                        name: "Beehive 1",
                        location: {
                            address: "",
                            lat: 0,
                            long: 0
                        },
                        source: {
                            type: ""
                        },
                        lost: {
                            isLost: true,
                            reason: ""
                        }
                    });
                    //this.loadInitialDataFromWebService();	
                }
                BeeHiveComponent.prototype.loadInitialDataFromWebService = function () {
                    var _this = this;
                    this.beehiveService.beeHives.subscribe(function (beeHives) { return _this.beehives = beeHives.slice(); }, function (error) { return console.error("Error" + error); }, function () {
                        console.log("Completed");
                        console.log(_this.beehives);
                    });
                };
                BeeHiveComponent.prototype.callGetCoordinates = function (index) {
                    var _this = this;
                    this.mapsService.getCoordinates(function (locParam) {
                        _this.beehives[index].location.lat = locParam.lat;
                        _this.beehives[index].location.long = locParam.long;
                    });
                };
                BeeHiveComponent.prototype.createBeeHive = function () {
                    this.router.navigate(['CreateBeeHive']);
                };
                BeeHiveComponent.prototype.editBeeHive = function (id) {
                    this.router.navigate(['EditBeeHive'], { id: id });
                };
                BeeHiveComponent = __decorate([
                    core_1.Component({
                        selector: 'BeeHive',
                        templateUrl: 'app/beehive/Templates/beehive.template.html',
                        providers: [beehive_service_1.BeeHiveService, maps_service_1.MapsService]
                    }), 
                    __metadata('design:paramtypes', [beehive_service_1.BeeHiveService, maps_service_1.MapsService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], BeeHiveComponent);
                return BeeHiveComponent;
                var _a;
            })();
            exports_1("BeeHiveComponent", BeeHiveComponent);
        }
    }
});
//# sourceMappingURL=beehive.component.js.map