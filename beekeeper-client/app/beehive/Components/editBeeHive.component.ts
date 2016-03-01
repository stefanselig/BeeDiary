import {Component, OnInit} 		from 'angular2/core';
import {Router, RouteParams} 		from 'angular2/router';

import {BeeHiveService}	from '../services/beehive.service';
import {MapsService, LocationParams, MarkerObject}	from '../services/maps.service';

import {BeeHiveForm}	from './beehiveForm.component';
import {MapComponent}	from './map.component';

import {BeeHive}	from '../../build-client/BeeHive/BeeHive';

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
	
	constructor(public beehiveService: BeeHiveService, public mapsService: MapsService, public router: Router, public params: RouteParams) {}
	
	ngOnInit(): void {
		this.loadSelectedBeeHive(this.params.get('id'));
	}	
	
	public loadSelectedBeeHive(id: string): void {
		this.beehiveService
		.getBeeHiveById(id)
		.subscribe(
			(res: BeeHive) => {
				this.beehive = res;
				this.isBeehiveLoaded = true;
				if (this.isMapLoaded) {
					console.log(this.beehive);
					if (this.beehive.hiveLocation.markerId != null)
						this.mapsService.assignMapToMarkers(this.beehive.hiveLocation.markerId);
				}
			},
			err => console.error(err)
		);
	}
	
	public updateBeeHive(): void {
		this.beehiveService
		.updateBeeHive(this.beehive)
		.subscribe(
			res => console.log(res),
			err => console.log(err),
			()  => this.router.navigate(['BeeHives'])
		);
	}
	
	public deleteBeeHive(): void {
		this.beehiveService
			.deleteBeeHiveById(this.beehive._id)
			.subscribe(
				res => console.log(res),
				err => console.log(err),
				()  => this.router.navigate(['BeeHives'])
			);
	}
	
	public cancel(): boolean {
		this.router.navigate(['BeeHives']);
		return false;
	}
	
	public callCenterMap(eventArgs: string): void {
		this.isMapLoaded = true;
		if (this.isBeehiveLoaded) {
			console.log(this.beehive);
			if (this.beehive.hiveLocation.markerId != null)
				this.mapsService.assignMapToMarkers(this.beehive.hiveLocation.markerId);
		}
		this.mapsService.centerMap();
	}
}