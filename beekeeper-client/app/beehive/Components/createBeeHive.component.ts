import {Component} 		from 'angular2/core';
import {Router}			from 'angular2/router';

import {BeeHiveService}	from '../services/beehive.service';
import {MapsService, LocationParams, MarkerObject}	from '../services/maps.service';

import {BeeHiveForm}	from './beehiveForm.component';
import {MapComponent}	from './map.component';

import * as BeeHiveModule	from '../../build-client/BeeHive/BeeHive';

@Component({
	selector: 'createbeehive',
	template: `
		<h1> Bienenstock </h1>
		<div class="col-sm-8">
				<form (ngSubmit)="createNewBeeHive()" #createBeeHiveForm="ngForm">
					<beehiveform [beehive]="beehive"></beehiveform>
					<button type="submit" class="btn btn-default">
						<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
					</button>
					<button (click)="cancel()" class="btn btn-default">
						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
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
		this.beehiveService
		.createBeeHive(this.beehive)
		.subscribe(
			res => {
				console.log(res);
				this.router.navigate(['BeeHives']);
			},
			err => console.log(err)
		);
	}
	
	public cancel(): void {
		this.router.navigate(['BeeHives']);
	}
}