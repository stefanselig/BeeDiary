import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {BeeHiveService}	from '../services/beehive.service';
import {MapsService}	from '../services/maps.service';

import {ViewBeeHiveComponent} from './viewBeeHive.component';
import {MapComponent}	from './map.component';
import {SearchComponent}	from './../../search/search.component';

import {BeeHive} from './../../build-client/BeeHive/BeeHive';

@Component({
	selector: 'BeeHive',
	template: `
		<h1>Deine Bienenstöcke: </h1>
		<div class="row">
			<div class="form-group form-inline">
				<search [collection]="allBeehives" [searchStrings]="beehiveStrings" [name]="'Bienenstöcke'" (OnSearchResult)="retrieveSearchResults($event)"></search>
				<button (click)="createBeeHive()" class="btn btn-default form-control">
					<span class="glyphicon glyphicon-file" aria-hidden="true"></span>
				</button>
				<button [innerHTML]="toggleMapText" (click)="toggleMap()" class="btn btn-default form-control" style="float:right;"></button>
			</div>
			<div [class]="isMapHidden ? 'col-sm-12' : 'col-sm-8'" style="overflow: auto; height: 70%;">
				<viewbeehive *ngFor="#beehive of beehives" [beehive]="beehive" [class]="isMapHidden ? 'col-sm-4' : 'col-sm-6'" (onBeeHiveDeleted)="removeBeeHive($event)"></viewbeehive>
			</div>
			<map *ngIf="!isMapHidden" class="col-sm-4" (afterMapInit)="initMarkers($event)" [latitude]="48" [longitude]="13"></map>
		</div>
	`,
	directives: [ViewBeeHiveComponent, MapComponent, SearchComponent]
})
export class BeeHiveComponent implements OnInit {
	public allBeehives: BeeHive[] = [];
	public beehives: BeeHive[] = [];
	public beehiveStrings: string[] = [];
	
	public toggleMapText: string = "Karte verbergen";
	public isMapHidden: boolean = false;
	
	constructor(public beehiveService: BeeHiveService, public mapsService: MapsService, public router: Router) {}
	
	ngOnInit(): void {
		this.getBeehives();
	}
	
	/**
	 * Toggles map on button click - show and hide.
	 */
	public toggleMap(): void {
		this.isMapHidden = !this.isMapHidden;
		this.toggleMapText = this.isMapHidden ? 'Karte anzeigen' : 'Karte verbergen';
	}
	
	/**
	 * Event callback when search result is available.
	 */
	public retrieveSearchResults(eventArgs: any[]) {
		this.beehives = eventArgs.slice();
	}
	
	/**
	 * Event callback when create beehive button is clicked.
	 */
	public createBeeHive(): void {
		this.router.navigate(['CreateBeeHive']);
	}
	
	/**
	 * Maps each beehive to a string representation for search.
	 */
	public getStringsForSearch(): void {
		this.beehives.forEach((e: BeeHive) => this.beehiveStrings.push(JSON.stringify(e)));
	}
	
	/**
	 * Gets data from service.
	 */
	public getBeehives(): void {
		this.beehiveService.beeHives.subscribe(
			(res: BeeHive[]) => {
				this.allBeehives = res.slice();
				this.beehives = res.slice();
				this.getStringsForSearch();
				this.mapDateStringsToDates('startDate');
				this.mapDateStringsToDates('lastDiaryEntryDate');
				console.log(this.allBeehives);
			},
			err => console.log(err),
			() => console.log("Load completed")
		);
	}
	
	/**
	 * Loads a marker for each beehive
	 */
	public initMarkers(eventArgs: string): void {
		this.beehives.forEach((e: BeeHive) => {
			if(e.hiveLocation.lat != null && e.hiveLocation.lng != null && e.hiveLocation.lat != undefined && e.hiveLocation.lng != undefined) {
				const locationParams = {
					lat: e.hiveLocation.lat,
					lng: e.hiveLocation.lng,
					position: new google.maps.LatLng(e.hiveLocation.lat, e.hiveLocation.lng)
				};
				e.hiveLocation.markerId = this.mapsService.createMarker(locationParams, e.hiveLocation.markerId);
			}
		});
		/*this.beehives
			.filter(beehive => beehive.hiveLocation.markerId != undefined)
			.forEach(beehive => this.mapsService.setInfoWindowText(beehive.hiveName, beehive.hiveLocation.markerId));*/
		this.mapsService.centerMap();
	}
	
	/**
	 * Maps dates that are strings to Dates
	 * (When converting a date to a JSON it becomes
	 * a string and needs to be converted back again)
	 */
	public mapDateStringsToDates(propertyName: string, option?: string): void {
		if (option == undefined) {
			this.allBeehives
				.filter(e => e[propertyName] != undefined && e[propertyName] != null && e[propertyName] != NaN)
				.forEach(e => e[propertyName] = new Date(e[propertyName]));
		}
		/*else {
			this.allBeehives
				.filter(e => e.type == option)
				.filter(e => e[propertyName] != undefined && e[propertyName] != null && e[propertyName] != NaN)
				.forEach(e => e[propertyName] = new Date(e[propertyName]));
		}*/
	}
	
	public removeBeeHive(id: string): void {
		let beehiveToDelete: BeeHive;
		let index: number;
		
		beehiveToDelete = this.allBeehives.find(beehive => beehive._id == id);

		for (var key in this.mapsService.markers) {
			if (this.mapsService.markers[key].id == beehiveToDelete.hiveLocation.markerId) {
				const markerToDelete = this.mapsService.markers[key];
				markerToDelete.marker.setMap(null);
				index = this.mapsService.markers.indexOf(markerToDelete);
				this.mapsService.markers.splice(index, 1);
			}
		}
		
		const beehiveStrToDelete = this.beehiveStrings.find(beehiveStr => JSON.stringify(beehiveToDelete) == beehiveStr);
		index = this.beehiveStrings.indexOf(beehiveStrToDelete);
		this.beehiveStrings.splice(index, 1);
		
		index = this.allBeehives.indexOf(beehiveToDelete);
		this.allBeehives.splice(index, 1);
		
		index = this.beehives.indexOf(beehiveToDelete);
		this.beehives.splice(index, 1);
		
		this.beehiveService
			.deleteBeeHiveById(id)
			.subscribe(
				res => console.log(res),
				err => console.log(err)
			);
	}
}