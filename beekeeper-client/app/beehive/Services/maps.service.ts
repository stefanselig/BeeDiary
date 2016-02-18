/// <reference path="../../../typings/tsd.d.ts" />
import {Injectable}			from 'angular2/core';
import {Http, Headers}		from 'angular2/http';
import {Observable}			from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MapsService {
	MAPID: string = "map";
	map: google.maps.Map;
	
	markers: MarkerObject[] = [];
	idCounter: number;
	
	constructor() {
		this.idCounter = this.markers.length;
	}
	
	/**
	 * Initializes a google map
	 */
	public initMap(lat: number, lng: number): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const coordinates = new google.maps.LatLng(lat,lng);
			const mapOptions = {center: coordinates, zoom: 6};
			this.map = new google.maps.Map(document.getElementById(this.MAPID), mapOptions);
			resolve("Map is ready.");
		});
	}
	
	/**
	 * Retrieves current position's coordinates
	 * @return {Promise<LocationParams>} - A promise of Location Params
	 */
	public getCoordinates(): Promise<LocationParams> {
		return new Promise<LocationParams>((resolve, reject) => {
			navigator
			.geolocation
			.getCurrentPosition(
				position => {
					const locParam: LocationParams = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
						position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
						address: ""
					}
					resolve(locParam);
				},
				error => reject(error),
				{
					enableHighAccuracy: true,
					timeout: 50000
				}
			);
		});
	}
	
	/**
	 * Retrieves the address of a position
	 * @param {LocationParams} locationParams - Position
	 * @return {string} -  Address
	 */
	public getAddress(locationParams: LocationParams): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const geoCoder = new google.maps.Geocoder();
			geoCoder.geocode(
				{
					location:
					{
						lat: locationParams.lat,
						lng: locationParams.lng
					}
				},
				(
					results: google.maps.GeocoderResult[], 
					status: google.maps.GeocoderStatus,
					error_message?: any
				) => {
					if (status == google.maps.GeocoderStatus.OK) {
						resolve(results[0].formatted_address);	
					}
					else {
						reject(status + error_message);
					}
				}
			);
		});
	}
	
	/**
	 * Creates a Google Maps Marker
	 * @param {LocationParams} locationParams - Position
	 * @param {number} id - The marker's id if it has one
	 * @returns {number} id - MarkerObject's id
	 */
	public createMarker(locationParams: LocationParams, id?: number): number {
		if (locationParams.position == undefined || locationParams.position == null) {
			return;
		}
		const marker = new google.maps.Marker({
			position: locationParams.position,
			map: this.map,
			title: 'BeeHive'
		});
		let newId;
		if (id == undefined || id == null) {
			newId = this.getNextId();
		}
		else {
			newId = id;
		}
		const markerObject: MarkerObject = {
			marker: marker,
			id: newId,
			position: locationParams.position
		};
		this.markers[markerObject.id] = markerObject;
		return markerObject.id;
	}
	
	/**
	 * Assigns the map to each marker
	 */
	public assignMapToMarkers(markerId?: number): void {
		if (markerId == undefined) {
			this.markers.forEach(marker => marker.marker.setMap(this.map));
		}
		else {
			if (markerId == null) {
				return;
			}
			else {
				if (this.markers[markerId] != undefined && this.markers[markerId] != null)
					this.markers[markerId].marker.setMap(this.map);	
			}
		}
	}
	
	/**
	 * Sets an info window for the selected marker.
	 */
	public setInfoWindowText(text: string, markerId: number): void {
		if (text == null || text == undefined) {
			text = "Bienenstock";
		}
		this.markers[markerId].infoWindow = new google.maps.InfoWindow({
			content: `<h1>${text}</h1>`
		});
		this.markers[markerId].marker
			.addListener("click", 
			() => this.markers[markerId].infoWindow.open(this.map, this.markers[markerId]));
	}
	
	
	/**
	 * Centers a google map
	 */
	public centerMap(): void {
		const bounds = new google.maps.LatLngBounds();
		this.markers
			.map(marker => marker.position)
			.map(position => bounds.extend(position));
		if (this.markers.length > 0) {
			this.map.setCenter(bounds.getCenter());
			this.map.fitBounds(bounds);
		}
	}
	
	/**
	 * Gets next id for markers
	 * @return {number} idCounter - Next Id
	 */
	public getNextId(): number {
		this.idCounter = this.idCounter + 1;
		return this.idCounter;
	}
}

/**
 * Represents a Location Parameter
 */
export interface LocationParams {
	/** Latitude */
	lat: number;
	/** Longitude */
	lng: number;
	/** GPS Position */
	position?: google.maps.LatLng;
	/** Location's address */
	address?: string;
}

/**
 * Represents a MarkerObject
 */
export interface MarkerObject {
	/** Google maps marker. */
	marker: google.maps.Marker;
	/** Unique Id */
	id: number;
	/** Marker's position */
	position: google.maps.LatLng;
	/** Google Maps Info window */
	infoWindow: google.maps.InfoWindow;
}