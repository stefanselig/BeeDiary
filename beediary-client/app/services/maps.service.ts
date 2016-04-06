import {Injectable}			from 'angular2/core';
import {Http, Headers}		from 'angular2/http';

import {Observable}			from 'rxjs/Observable';
import {Observer}			from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import * as BeeHiveModel from '../model/model/BeeHive/BeeHive';

@Injectable()
export class MapsService {
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
	/** Creates a new google maps marker */
	createMarker(hiveLocation: BeeHiveModel.HiveLocation): google.maps.Marker {
		if (hiveLocation.lat != undefined && hiveLocation.lng != undefined)
			return new google.maps.Marker({
				position: new google.maps.LatLng(hiveLocation.lat, hiveLocation.lng),
				title: `Bienenstock`
			});
		else
			return null;
	}
	/** Adds a marker to the saved collection */
	addMarker(marker: google.maps.Marker, id: string): void {
		this.markers[id] = {
			marker: marker,
			position: marker.getPosition(),
			infoWindow: undefined
		};
	}
	/** Map-Marker assignment */
	assignMarkerToMap(id: string, marker: google.maps.Marker): void {
		if (id == undefined) {
			 marker.setMap(this.map);
		} else {
			this.addMarker(marker, id);
			this.markers[id].marker != undefined ? this.markers[id].marker.setMap(this.map) : false;
		}
	}
	/** Sets InfoWindow text for marker */
	setInfoWindowText(text: string = `Bienenstock`, id: string, marker?: google.maps.Marker): void {
		const infoWindow = new google.maps.InfoWindow({ content: `<h3>${text}</h3>` });
		if (id != undefined && id != null) {
			this.markers[id].infoWindow = infoWindow;
			this.markers[id].marker.addListener(`click`, () => {
				this.markers[id].infoWindow.open(this.map, this.markers[id].marker);
			});
		} else {
			marker.addListener(`click`, () => {
				infoWindow.open(this.map, marker);
			});
		}
	}
	/** Centers the google map */
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
	/** Deletes all map markers */
	deleteAllMarkers(): void {
		for (const key in this.markers) {
			this.markers[key].marker.setMap(null);
		}
		this.markers = [];
	}
}

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