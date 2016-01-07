import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';
/// <reference path="../../typings/googlemaps/google.maps.d.ts" />
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
	
 	initMap() {
		var coordinates = new google.maps.LatLng(48, 13);
		var mapOptions = {
			center: coordinates,
			zoom: 6
		};
		this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	}
}