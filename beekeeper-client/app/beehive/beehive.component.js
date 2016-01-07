System.register(['angular2/core', './beehive.service', './maps.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, beehive_service_1, maps_service_1;
    var BeeHiveComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (beehive_service_1_1) {
                beehive_service_1 = beehive_service_1_1;
            },
            function (maps_service_1_1) {
                maps_service_1 = maps_service_1_1;
            }],
        execute: function() {
            BeeHiveComponent = (function () {
                function BeeHiveComponent(beeHiveService, mapsService) {
                    this.beehives = [];
                    //this.beehiveService = beeHiveService;
                    //this.beehives = this.beehiveService.beeHives.slice();
                    this.mapsService = mapsService;
                }
                BeeHiveComponent.prototype.getCoordinates = function (index) {
                    var instance = this;
                    navigator.geolocation.getCurrentPosition(function (position) {
                        instance.beehives[index].location.lat = position.coords.latitude;
                        instance.beehives[index].location.long = position.coords.longitude;
                    });
                };
                BeeHiveComponent = __decorate([
                    core_1.Component({
                        selector: 'BeeHive',
                        templateUrl: 'app/beehive/Templates/beehive.template.html',
                        providers: [beehive_service_1.BeeHiveService, maps_service_1.MapsService]
                    }), 
                    __metadata('design:paramtypes', [beehive_service_1.BeeHiveService, maps_service_1.MapsService])
                ], BeeHiveComponent);
                return BeeHiveComponent;
            })();
            exports_1("BeeHiveComponent", BeeHiveComponent);
        }
    }
});
//# sourceMappingURL=beehive.component.js.map