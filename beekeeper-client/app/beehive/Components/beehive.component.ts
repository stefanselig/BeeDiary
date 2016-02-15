import {Component, OnInit, AfterViewInit, AfterViewChecked} 		from 'angular2/core';
import {Router} 		from 'angular2/router';

import {BeeHiveService}	from '../services/beehive.service';
import {MapsService}	from '../services/maps.service';

import {MapComponent}	from './map.component';
import {ViewBeeHiveComponent} from './viewBeeHive.component';
import {SearchComponent}	from './../../search/search.component';

@Component({
	selector: 'BeeHive',
	template: `
		<h1>Deine Bienenstöcke: </h1>
		<div class="row">
			<div class="form-group form-inline">
				<search [collection]="allBeehives" [searchStrings]="beehiveStrings" [name]="'Bienenstöcken'" (OnSearchResult)="retrieveSearchResults($event)"></search>
				<button (click)="createBeeHive()" class="btn btn-default form-control">
					<span class="glyphicon glyphicon-file" aria-hidden="true"></span>
				</button>
			</div>
			<div class="col-sm-8" style="overflow: auto; height: 70%;">
				<viewbeehive *ngFor="#beehive of beehives" [beehive]="beehive"></viewbeehive>
			</div>
			<map class="col-sm-4" (afterMapInit)="initMarkers($event)" [latitude]="48" [longitude]="13"></map>
		</div>
	`,
	providers: [BeeHiveService],
	directives: [ViewBeeHiveComponent, MapComponent, SearchComponent]
})
export class BeeHiveComponent implements OnInit, AfterViewInit, AfterViewChecked {
	// TODO Refactor beehives to use beehives model
	public allBeehives: any[] = [];
	public beehives: any[] = [];
	public beehiveStrings: string[] = [];
	
	constructor(public beehiveService: BeeHiveService, public mapsService: MapsService, public router: Router) {}
	
	ngOnInit(): void {
		this.getBeehives();
	}
	
	ngAfterViewInit(): void {}
	
	ngAfterViewChecked(): void {}
	
	public retrieveSearchResults(eventArgs: any[]) {
		this.beehives = eventArgs.slice();
	}
	
	public createBeeHive(): void {
		this.router.navigate(['CreateBeeHive']);
	}
	
	public getStringsForSearch(): void {
		this.beehives.map(e => this.beehiveStrings.push(JSON.stringify(e)));
	}
	
	public getBeehives(): void {
		this.beehiveService.beeHives.subscribe(
			res => {
				this.allBeehives = res.slice();
				this.beehives = res.slice();
				this.getStringsForSearch();
				this.mapDateStringsToDates('startDate');
			},
			err => console.log(err),
			() => console.log("Load completed")
		);
	}
	
	public initMarkers(eventArgs: string): void {
		this.beehives.map(e => e.hiveLocation.markerId = this.mapsService.createMarker({
			lat: e.hiveLocation.lat,
			lng: e.hiveLocation.lng,
			position: new google.maps.LatLng(e.hiveLocation.lat, e.hiveLocation.lng)
		}, e.hiveLocation.markerId));
		this.mapsService.centerMap();
	}
	
	/**
	 * Maps dates that are strings to Dates
	 */
	public mapDateStringsToDates(propertyName: string, option?: string): void {
		if (option == undefined) {
			this.allBeehives
				.filter(e => e[propertyName] != undefined && e[propertyName] != null && e[propertyName] != NaN)
				.forEach(e => e[propertyName] = new Date(e[propertyName]));
		}
		else {
			this.allBeehives
				.filter(e => e.type == option)
				.filter(e => e[propertyName] != undefined && e[propertyName] != null && e[propertyName] != NaN)
				.forEach(e => e[propertyName] = new Date(e[propertyName]));
		}
	}
	
	/*public callGetCoordinates(index: number) {
		this.mapsService
		.getCoordinates()
		.then(res => {
			this.beehives[index].location.lat = res.lat;
			this.beehives[index].location.long = res.lng;
		})
		.catch(err => console.error(err));
	}*/
}


	//public beehiveService: BeeHiveService;
	//public mapsService: MapsService;
	//public router: Router;
	/*this.beehiveService = beeHiveService;
	this.mapsService = mapsService;
	this.router = router;*/
	
	/*public loadInitialDataFromWebService(): void {
		this.beehiveService.beeHives.subscribe(
			res => {
				this.allBeehives = res.slice();
				this.beehives = this.allBeehives.slice();
				this.getStringsForSearch();
				this.beehives.map(e => e.hiveLocation.marker = this.mapsService.getMarker(e.hiveLocation));
				this.mapsService.centerMap();
				this.mapDateStringsToDates('startDate');
			},
			error => console.error("Error" + error),
			() => {
				console.log("Completed");
				console.log(this.beehives);
			}
		);
	}*/
	/*public search(formContent: any): void {
		var query: string = formContent.value.query;
		this.beehives.length = 0;
		if (query == undefined)
			this.beehives = this.allBeehives.slice();
		else {
			this.elementsStrings
			.filter(e => e.toUpperCase().indexOf(query.toUpperCase()) != -1)
			.forEach(e => this.allBeehives
				.filter(x => x._id == JSON.parse(e)._id)
				.map(y => this.beehives.push(y)));	
		}
	}*/