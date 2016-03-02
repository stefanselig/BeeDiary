import {Component} 		from 'angular2/core';
import {Router}			from 'angular2/router';

import {BeeHiveService}	from '../../../services/beehive.service';
import {MapsService, LocationParams, MarkerObject}	from '../../../services/maps.service';

import {BeeHiveForm}	from '../beehiveform/beehiveForm.component';
import {MapComponent}	from '../map/map.component';

import * as BeeHiveModule	from '../../../model/BeeHive/BeeHive';

@Component({
	selector: 'createbeehive',
	template: `
		<h1> Bienenstock </h1>
		<div class="col-sm-8">
			<form (ngSubmit)="createNewBeeHive()" #createbeehiveform="ngForm">
				<beehiveform [beehive]="beehive"></beehiveform>
				<button type="submit" class="btn btn-default" [disabled]="!createbeehiveform.valid">
					<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
				</button>
				<button (click)="cancel()" class="btn btn-default">
					<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
				</button>
			</form>
		</div>
		<map class="col-sm-4" [latitude]="48" [longitude]="13"></map>
	`,
	directives: [BeeHiveForm, MapComponent]
})
export class CreateBeeHiveComponent {
	public beehive: BeeHiveModule.BeeHive = new BeeHiveModule.BeeHive();
	
	constructor(public mapsService: MapsService, public beehiveService: BeeHiveService, public router: Router) {
		this.beehive.lost = new BeeHiveModule.Lost();
		this.beehive.source = new BeeHiveModule.Source();
		this.beehive.hiveLocation = new BeeHiveModule.HiveLocation();
	}
	
	public createNewBeeHive(): void {
		console.log(this.beehive);
		this.beehiveService
		.createElement(JSON.stringify(this.beehive))
		.subscribe(
			res => {
				console.log(res);
				this.router.navigate(['BeeHives']);
			},
			err => console.log(err)
		);
	}
	
	public cancel(): boolean {
		this.router.navigate(['BeeHives']);
		return false;
	}
}