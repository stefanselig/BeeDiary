import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Utilities} from '../../../services/utilities.service';
import {BeeHiveService}	from '../../../services/beehive.service';
import {MapsService, MarkerObject}	from '../../../services/maps.service';

import {BeeHiveForm}	from '../beehiveform/beehiveForm.component';
import {MapComponent}	from '../map/map.component';

import {BeeHive} from '../../../model/model/BeeHive/BeeHive';

@Component({
	selector: 'editBeeHive',
	template: `
		<h1> Bienenstock </h1>
		<div class="col-sm-8">
			<form (ngSubmit)="updateBeeHive()" #updatebeehiveform="ngForm">
				<beehiveform [beehive]="beehive"></beehiveform>
				<button type="submit" class="btn btn-default" [disabled]="!updatebeehiveform.valid">
					<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
				</button>
				<button (click)="deleteBeeHive()" class="btn btn-default">
					<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
				</button>
				<button (click)="cancel()" class="btn btn-default">
					<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
				</button>
			</form>
		</div>
		<map class="col-sm-4" [latitude]="48" [longitude]="13" (afterMapInit)="callCenterMap($event)"></map>
	`,
	directives: [BeeHiveForm, MapComponent]
})
export class EditBeeHiveComponent implements OnInit {
	public beehive: BeeHive = new BeeHive();
	
	public isMapLoaded: boolean = false;
	public isBeehiveLoaded: boolean = false;
	
	constructor(public beehiveService: BeeHiveService, public mapsService: MapsService, public router: Router, public params: RouteParams, public utils: Utilities) {}
	
	ngOnInit(): void {
		this.loadSelectedBeeHive(this.params.get('id'));
	}
	/** Loads the selected BeeHive from Service */
	public loadSelectedBeeHive(id: string): void {
		this.beehiveService
		.getElementById(id)
		.subscribe(
			(res: BeeHive) => {
				this.beehive = res;
				this.isBeehiveLoaded = true;
				if (this.isMapLoaded) {
					this.initMap();
				}
			},
			err => this.utils.errCallback(err)
		);
	}
	/** Initializes a google map */
	initMap(): void {
		const marker = this.mapsService.createMarker(this.beehive.hiveLocation);
		this.mapsService.assignMarkerToMap(this.beehive._id, marker);
		this.mapsService.centerMap(marker);
	}
	/** Updates the selected BeeHive */
	public updateBeeHive(): void {
		this.beehiveService
		.updateElement(JSON.stringify(this.beehive), this.beehive._id)
		.subscribe(
			res => console.log(res),
			err => this.utils.errCallback(err),
			()  => this.router.navigate(['BeeHives'])
		);
	}
	/** Deletes the selected BeeHive */
	public deleteBeeHive(): void {
		this.beehiveService
			.deleteElementById(this.beehive._id)
			.subscribe(
				res => console.log(res),
				err => this.utils.errCallback(err),
				()  => this.router.navigate(['BeeHives'])
			);
	}
	/** Cancels the current action and navigates back to BeeHiveMainView */
	public cancel(): boolean {
		this.router.navigate(['BeeHives']);
		return false;
	}
	/** Event callback that is fired when map is ready */
	public callCenterMap(eventArgs: string): void {
		this.isMapLoaded = true;
		if (this.isBeehiveLoaded) {
			this.initMap();
		}
	}
}