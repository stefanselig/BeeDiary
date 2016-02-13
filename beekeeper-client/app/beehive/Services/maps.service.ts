/// <reference path="../../../typings/tsd.d.ts" />
import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';

//import  '../../typings/googlemaps/google.maps';
//import 'google.maps';
//import {Map}		from 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD52xcKSvVXXDFZt43dW0oUR3mR3K_v-vk';
//import googleMaps = require('google.maps');
//import {GoogleMaps} from 'google.maps';

@Injectable()
export class MapsService {
	map: google.maps.Map;
	markers: MarkerObj[] = [];
	latlngs: google.maps.LatLng[] = [];
	idCounter: number;

	constructor() {
		this.idCounter = this.markers.length;
		//this.initMap();
	}

 	public initMap(callback: () => void) {
		var coordinates = new google.maps.LatLng(48, 13);
		var mapOptions = {
			center: coordinates,
			zoom: 6
		};
		if (this.map == undefined) {
			this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		}
		callback();
	}

	public getCoordinates(): Promise {
		return new Promise((resolve, reject) => {
			navigator
			.geolocation
			.getCurrentPosition(
				position => {
					var locParam: LocationParams = {
						lat: position.coords.latitude,
						long: position.coords.longitude,
						address: ""
					}
					resolve(locParam);
				},
				error => {
					reject(error);
				}
			);
		});
	}

	public getAddress(locationParams: LocationParams): Promise {
		return new Promise((resolve, reject) => {
			(new google.maps.Geocoder)
			.geocode(
				{
					'location':
					{
						lat: locationParams.lat,
						lng: locationParams.long
					}
				},
				(results, status, error_message?) => {
					if (status == 'OK') {
						resolve(results[0].formatted_address);	
					}
					else {
						reject(status, error_message);
					}
				}
			);
		});
	}

	public getMarker(locationParams): MarkerObj {
		this.initMap(() => {
			var latlngObj: google.maps.LatLng = new google.maps.LatLng(locationParams.lat, locationParams.long);
			var marker = new google.maps.Marker({
				position: latlngObj,
				map: this.map,
				title: 'BeeHive'
			});
			var markerObj = {};
			markerObj.marker = marker;
			markerObj.id = this.getNextId();
			this.markers.push(markerObj);
			this.latlngs.push(latlngObj);
			return markerObj;
		});
	}

	public getNextId(): number {
		this.idCounter = this.idCounter + 1;
		return this.idCounter;
	}
	
	public centerMap(): void {
		var bounds = new google.maps.LatLngBounds();
		this.latlngs.map(latlng => bounds.extend(latlng));
		this.map.setCenter(bounds.getCenter());
		this.map.fitBounds(bounds);
	}
}

export interface LocationParams {
	lat: number;
	long: number;
	address: string;
}

export interface MarkerObj {
	marker: google.maps.Marker;
	id: number;
}