System.register(['angular2/core', 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var MapsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {}],
        execute: function() {
            /// <reference path="../../../typings/googlemaps/google.maps.d.ts" />
            //import  '../../typings/googlemaps/google.maps';
            //import 'google.maps';
            //import {Map}		from 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD52xcKSvVXXDFZt43dW0oUR3mR3K_v-vk';
            //import googleMaps = require('google.maps');
            //import {GoogleMaps} from 'google.maps';
            MapsService = (function () {
                function MapsService() {
                    // Somehow getMarkers() from REST
                    this.markers = [];
                    this.idCounter = this.markers.length;
                    this.initMap();
                }
                MapsService.prototype.initMap = function () {
                    var coordinates = new google.maps.LatLng(48, 13);
                    var mapOptions = {
                        center: coordinates,
                        zoom: 6
                    };
                    if (this.map == undefined) {
                        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                    }
                };
                MapsService.prototype.getCoordinates = function (callback) {
                    //var instance = this;
                    var locParam;
                    navigator.geolocation.getCurrentPosition(function (position) {
                        locParam = {
                            lat: position.coords.latitude,
                            long: position.coords.longitude,
                            address: ""
                        };
                        callback(locParam);
                        /*if (index != undefined) {
                            instance.beehives[index].location.lat = position.coords.latitude;
                            instance.beehives[index].location.long = position.coords.longitude;
                        }
                        else {
                            this.location.lat = position.coords.latitude;
                            this.location.long = position.coords.longitude;
                        }*/
                    });
                };
                MapsService.prototype.getAddress = function (locationParams, callback) {
                    var geocoder = new google.maps.Geocoder;
                    geocoder.geocode({
                        'location': {
                            lat: locationParams.lat,
                            lng: locationParams.long
                        }
                    }, function (results) {
                        console.log(results);
                        callback(results[0].formatted_address);
                    });
                };
                MapsService.prototype.getMarker = function (locationParams) {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locationParams.lat, locationParams.long),
                        map: this.map,
                        title: 'BeeHive'
                    });
                    var markerObj = {};
                    markerObj.marker = marker;
                    markerObj.id = this.getNextId();
                    return markerObj;
                };
                MapsService.prototype.getNextId = function () {
                    this.idCounter = this.idCounter + 1;
                    return this.idCounter;
                };
                MapsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MapsService);
                return MapsService;
            })();
            exports_1("MapsService", MapsService);
        }
    }
});
//# sourceMappingURL=maps.service.js.map