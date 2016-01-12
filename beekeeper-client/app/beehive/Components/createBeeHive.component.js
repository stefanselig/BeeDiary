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
    var CreateBeeHiveComponent;
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
            CreateBeeHiveComponent = (function () {
                function CreateBeeHiveComponent(mapsService, beeHiveService, router) {
                    this.sourceTypes = [];
                    this.frameSizes = [];
                    this.frameMaterials = [];
                    this.combConstructions = [];
                    // Placeholder until web service for that use case is available:
                    this.sourceTypes = ["aa", "bb", "cv", "ddf", "Other"];
                    this.frameSizes = ["aa", "bb", "cv", "ddf", "edfa"];
                    this.frameMaterials = ["aa", "bb", "cv", "ddf", "edfa"];
                    this.combConstructions = ["aa", "bb", "cv", "ddf", "edfa"];
                    this.beehiveService = beeHiveService;
                    this.mapsService = mapsService;
                    this.router = router;
                    this.location = {
                        lat: 0,
                        long: 0,
                        address: ""
                    };
                }
                CreateBeeHiveComponent.prototype.callGetCoordinates = function () {
                    var _this = this;
                    var instance = this;
                    this.mapsService.getCoordinates(function (locParam) {
                        _this.location.lat = locParam.lat;
                        _this.location.long = locParam.long;
                        instance.markerObj = instance.mapsService.getMarker(locParam);
                        _this.callGetAddress();
                    });
                };
                CreateBeeHiveComponent.prototype.callGetAddress = function () {
                    var instance = this;
                    this.mapsService.getAddress(this.location, function (address) {
                        console.log("address is: " + address);
                        instance.location.address = address;
                    });
                };
                CreateBeeHiveComponent.prototype.createNewBeeHive = function (createBeeHiveForm) {
                    //this.beehiveService.createBeeHive(this.newBeeHive);
                    console.log(createBeeHiveForm.value);
                    this.newBeeHive = {};
                    this.router.navigate(['BeeHive']);
                };
                CreateBeeHiveComponent.prototype.cancel = function () {
                    this.router.navigate(['BeeHive']);
                };
                CreateBeeHiveComponent = __decorate([
                    core_1.Component({
                        selector: 'CreateBeeHive',
                        templateUrl: 'app/beehive/Templates/createBeeHive.template.html',
                        providers: [beehive_service_1.BeeHiveService, maps_service_1.MapsService]
                    }), 
                    __metadata('design:paramtypes', [maps_service_1.MapsService, beehive_service_1.BeeHiveService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], CreateBeeHiveComponent);
                return CreateBeeHiveComponent;
                var _a;
            })();
            exports_1("CreateBeeHiveComponent", CreateBeeHiveComponent);
        }
    }
});
//# sourceMappingURL=createBeeHive.component.js.map