import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {BeeHiveService}	from '../../../services/beehive.service';
import {MapsService}	from '../../../services/maps.service';
import {SearchService}	from '../../../services/search.service';
import {Utilities}		from '../../../services/utilities.service';

import {ViewBeeHiveComponent} from '../viewbeehive/viewBeeHive.component';
import {MapComponent} from '../map/map.component';
import {SearchComponent} from '../../search/search.component';

import {BeeHive} from '../../../model/BeeHive/BeeHive';
// Somehow include _id in model
@Component({
	selector: 'BeeHive',
	template: `
		<h1>Deine Bienenstöcke: </h1>
		<div class="row">
			<div class="form-group form-inline">
				<search [name]="'Bienenstöcke'" (onSearch)="search($event)"></search>
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
	directives: [ViewBeeHiveComponent, MapComponent, SearchComponent],
	providers: [SearchService]
})
export class BeeHiveComponent implements OnInit {
	public beehives: BeeHive[] = [];
	
	public toggleMapText: string = "Karte verbergen";
	public isMapHidden: boolean = false;
	
	constructor(public beehiveService: BeeHiveService, public mapsService: MapsService, public router: Router, public utils: Utilities, public searchService: SearchService<BeeHive>) {}
	
	ngOnInit(): void {
		this.searchService.initSearch(this.beehiveService);
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
	 * Event callback when query is fired.
	 */
	public search(eventArgs: string) {
		this.beehives.length = 0;
		this.searchService.search(eventArgs).subscribe(
			res => {
				if (res.startDate != undefined) {
					res.startDate = new Date(res.startDate.toString());	
				}
				if (res.lastDiaryEntryDate != undefined) {
					res.lastDiaryEntryDate = new Date(res.lastDiaryEntryDate.toString());	
				}
				this.beehives.push(res);
			},
			err => console.error(err),
			() => console.log("Completed.")
		);
	}
	
	/**
	 * Event callback when create beehive button is clicked.
	 */
	public createBeeHive(): void {
		this.router.navigate(['CreateBeeHive']);
	}
	
	/**
	 * Gets data from service.
	 */
	public getBeehives(): void {
		this.beehiveService.elements.subscribe(
			(res: BeeHive[]) => {
				this.beehives = res.slice();
				this.beehives = this.utils.mapDateStringsToDates('startDate', this.beehives);
				this.beehives = this.utils.mapDateStringsToDates('lastDiaryEntryDate', this.beehives);
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
				/*const hiveLocation = {
					lat: e.hiveLocation.lat,
					lng: e.hiveLocation.lng,
					position: new google.maps.LatLng(e.hiveLocation.lat, e.hiveLocation.lng)
				};*/
				e.hiveLocation.position = new google.maps.LatLng(e.hiveLocation.lat, e.hiveLocation.lng); 
				const marker = this.mapsService.createMarker(e.hiveLocation);
				this.mapsService.assignMarkerToMap(e._id, marker);
				this.mapsService.setInfoWindowText(e.hiveName, e._id);
			}
		});
		/*this.beehives
			.filter(beehive => beehive.hiveLocation.markerId != undefined)
			.forEach(beehive => this.mapsService.setInfoWindowText(beehive.hiveName, beehive.hiveLocation.markerId));*/
		this.mapsService.centerMap();
	}
	
	public removeBeeHive(id: string): void {
		this.beehiveService.deleteElementById(id).subscribe(
			res => console.log(res),
			err => console.error(err)
		);
		// ?
		const beehiveToDelete = this.beehives.find(beehive => beehive._id == id);
		
		for (var key in this.mapsService.markers) {
			if (this.mapsService.markers[key].id == beehiveToDelete.hiveLocation.markerId) {
				const markerToDelete = this.mapsService.markers[key];
				markerToDelete.marker.setMap(null);
				const index = this.mapsService.markers.indexOf(markerToDelete);
				this.mapsService.markers.splice(index, 1);
			}
		}
		
		this.beehives.splice(this.beehives.indexOf(beehiveToDelete), 1);
	}
}