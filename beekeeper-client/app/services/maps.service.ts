import {Injectable}			from 'angular2/core';
import {Http, Headers}		from 'angular2/http';

import {Observable}			from 'rxjs/Observable';
import {Observer}			from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import * as BeeHiveModel from '../model/model/BeeHive/BeeHive';

@Injectable()
export class MapsService {
	// Refactor whole maps service
	// TODO:
	// - Get rid of interfaces
	// - Maybe save markers n stuff into db
	// - Refactor markers
	// - Fix bug of map loading error
	MAP_ID: string = "map";
	map: google.maps.Map;
	
	markers: Array<MarkerObject> = [];
	
	/**
	 * Initializes a google map
	 */
	public initMap(lat: number, lng: number): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const coordinates = new google.maps.LatLng(lat,lng);
			const mapOptions = {center: coordinates, zoom: 6};
			this.map = new google.maps.Map(document.getElementById(this.MAP_ID), mapOptions);
			resolve("Map is ready");
		});
	}
	
	/**
	 * Retrieves current position's coordinates
	 * @return {Observable<HiveLocation>} - A promise of Location Params
	 */
	public getCoordinates(): Promise<BeeHiveModel.HiveLocation> {
		return new Promise<BeeHiveModel.HiveLocation>((resolve, reject) => {
			navigator
			.geolocation
			.getCurrentPosition(
				position => {
					const loc: BeeHiveModel.HiveLocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
						position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
						address: "",
						markerId: undefined
					};
					resolve(loc);
				},
				err => reject(err),{enableHighAccuracy: true, timeout: 50000});
		});
	}
	
	/**
	 * Retrieves the address of a position
	 * @param {HiveLocation} hiveLocation - Position
	 * @return {string} -  Address
	 */
	public getAddress(hiveLocation: BeeHiveModel.HiveLocation): Promise<string> {
		return new Promise((resolve, reject) => {
			const geoCoder = new google.maps.Geocoder();
			geoCoder.geocode(
				{location: { lat: hiveLocation.lat, lng: hiveLocation.lng }},
				(results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus, error_message?: any) => {
				status == google.maps.GeocoderStatus.OK ? resolve(results[0].formatted_address) : reject(status + error_message);});
		});
	}
	
	createMarker(hiveLocation: BeeHiveModel.HiveLocation): google.maps.Marker {
		if (hiveLocation.lat != undefined && hiveLocation.lng != undefined)
			return new google.maps.Marker({
				position: new google.maps.LatLng(hiveLocation.lat, hiveLocation.lng),
				title: `Bienenstock`
			});
		else
			return null;
	}
	
	addMarker(marker: google.maps.Marker, id: string): void {
		this.markers[id] = {
			marker: marker,
			position: marker.getPosition(),
			infoWindow: undefined
		};
	}
	
	assignMarkerToMap(id: string, marker: google.maps.Marker): void {
		if (id == undefined) {
			 marker.setMap(this.map);
		} else {
			this.addMarker(marker, id);
			this.markers[id].marker != undefined ? this.markers[id].marker.setMap(this.map) : false;	
		}
	}
	
	setInfoWindowText(text: string = `Bienenstock`, id: string, marker?: google.maps.Marker): void {
		if (id != undefined && id != null) {
			this.markers[id].infoWindow = new google.maps.InfoWindow({
				content: `<h3>${text}</h3>`
			});
			this.markers[id].marker.addListener(`click`, () => {
				this.markers[id].infoWindow.open(this.map, this.markers[id].marker);
			});
		} else {
			var infoWindow = new google.maps.InfoWindow({
				content: `<h3>${text}</h3>`
			});
			marker.addListener(`click`, () => {
				infoWindow.open(this.map, marker);
			});
		}
	}
	
	centerMap(marker?: google.maps.Marker): void {
		const bounds = new google.maps.LatLngBounds();
		if (marker == undefined) {
			for (const key in this.markers) {
				bounds.extend(this.markers[key].position);
			}
			if (Object.keys(this.markers).length > 0) {
				this.map.setCenter(bounds.getCenter());
				this.map.fitBounds(bounds);	
			}
		} else {
			bounds.extend(marker.getPosition());
			this.map.setCenter(bounds.getCenter());
			this.map.fitBounds(bounds);
		}
	}
	
	
	
	
	/**
	 * Creates a Google Maps Marker
	 * @param {LocationParams} locationParams - Position
	 * @param {number} id - The marker's id if it has one
	 * @returns {number} id - MarkerObject's id
	 */
	// public createMarker(hiveLocation: BeeHiveModel.HiveLocation, id: string): MarkerObject {
	// 	if (hiveLocation.position == undefined || hiveLocation.position == null) {
	// 		return;
	// 	}
	// 	const marker = new google.maps.Marker({
	// 		position: hiveLocation.position,
	// 		title: 'Bienenstock'
	// 	});
	// 	const markerObject: MarkerObject = {
	// 		marker: marker,
	// 		position: hiveLocation.position,
	// 		infoWindow: undefined
	// 	};
	// 	return markerObject;
	// 	//this.markers[id] = markerObject;
	// }
	
	/**
	 * Assigns the map to each marker
	 */
	// public assignMapToMarkers(markerId?: number): void {
	// 	if (markerId == undefined) {
	// 		//this.markers.forEach(marker => marker.marker.setMap(this.map));
	// 		for (const key in this.markers) {
	// 			const currMarker = this.markers[key];
	// 			currMarker.marker.setMap(this.map);
	// 		}
	// 	}
	// 	else {
	// 		if (markerId == null) {
	// 			return;
	// 		}
	// 		else {
	// 			if (this.markers[markerId] != undefined && this.markers[markerId] != null)
	// 				this.markers[markerId].marker.setMap(this.map);
	// 		}
	// 	}
	// }
	
	/**
	 * Sets an info window for the selected marker.
	 */
	// public setInfoWindowText(text: string, id: string): void {
	// 	if (text == null || text == undefined) {
	// 		text = "Bienenstock";
	// 	}
	// 	this.markers[id].infoWindow = new google.maps.InfoWindow({
	// 		content: `<h3>${text}</h3>`
	// 	});
	// 	this.markers[id].marker
	// 		.addListener("click",
	// 		() => {
	// 			console.log(this.markers[id]);
	// 			this.markers[id].infoWindow.open(this.map, this.markers[id].marker);
	// 		});
	// }
	
	
	// /**
	//  * Centers a google map
	//  */
	// public centerMap(marker?: google.maps.Marker): void {
	// 	const bounds = new google.maps.LatLngBounds();
	// 	if (marker == undefined) {
	// 		let count = 0;
	// 		for (const key in this.markers) {
	// 			const currMarker = this.markers[key];
	// 			currMarker.position = bounds.extend(currMarker.position);
	// 			count++;
	// 		}
	// 		if (count > 0) {
	// 			this.map.setCenter(bounds.getCenter());
	// 			this.map.fitBounds(bounds);
	// 		}
	// 		/*this.markers
	// 		.map(marker => marker.position)
	// 		.map(position => bounds.extend(position));*/
	// 	}
	// 	else {
	// 		const extendedBounds = bounds.extend(marker.getPosition());
	// 		marker.setPosition(extendedBounds);
	// 		this.map.setCenter(bounds.getCenter());
	// 		this.map.fitBounds(bounds);
	// 	}
	// }
}

/**
 * Represents a Location Parameter
 */
// export interface LocationParams {
// 	/** Latitude */
// 	lat: number;
// 	/** Longitude */
// 	lng: number;
// 	/** GPS Position */
// 	position?: google.maps.LatLng;
// 	/** Location's address */
// 	address?: string;
// }

/**
 * Represents a MarkerObject
 */
export interface MarkerObject {
	/** Google maps marker. */
	marker: google.maps.Marker;
	/** Marker's position */
	position: google.maps.LatLng;
	/** Google Maps Info window */
	infoWindow: google.maps.InfoWindow;
}