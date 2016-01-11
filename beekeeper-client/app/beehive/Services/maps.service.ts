import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';
/// <reference path="../../../typings/googlemaps/google.maps.d.ts" />

//import  '../../typings/googlemaps/google.maps';

//import 'google.maps';
//import {Map}		from 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD52xcKSvVXXDFZt43dW0oUR3mR3K_v-vk';
//import googleMaps = require('google.maps');
//import {GoogleMaps} from 'google.maps';

@Injectable()
export class MapsService {
	map: google.maps.Map;
	
	constructor() {
		this.initMap();
	}
	
 	public initMap() {
		var coordinates = new google.maps.LatLng(48, 13);
		var mapOptions = {
			center: coordinates,
			zoom: 6
		};
		if (this.map == undefined) {
			this.map = new google.maps.Map(document.getElementById('map'), mapOptions);	
		}
	}
	
	public getCoordinates(callback: any): void {
		//var instance = this;
		var locParam: LocationParams;
		navigator.geolocation.getCurrentPosition(position => {
			locParam = {
				lat: position.coords.latitude,
				long: position.coords.longitude
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
	}
}

export interface LocationParams {
	lat: number;
	long: number;
}