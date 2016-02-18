import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {BeeHiveService}	from '../services/beehive.service';
import {MapsService}	from '../services/maps.service';

import {BeeHive} from '../../build-client/BeeHive/BeeHive';

@Component({
	selector: 'viewbeehive',
	templateUrl: 'app/beehive/Templates/viewBeehive.template.html',
	inputs: ['beehive'],
	outputs: ['onBeeHiveDeleted'],
	styles: [`
		.photoHeader {
			float: right;
		}
		.beehivePhoto {
			display: inline-block;
			height: 50%;
			vertical-align: middle;
			margin-top: 20%;
		}
	`]
})
export class ViewBeeHiveComponent {
	public beehive: BeeHive;
	public viewDetails: boolean = false;
	public onBeeHiveDeleted: EventEmitter<string> = new EventEmitter<string>();
	
	constructor(public beeHiveService: BeeHiveService, public mapsService: MapsService, public router: Router, params: RouteParams) {}
	
	public showDetails(): void {
		this.viewDetails = !this.viewDetails;
	}
	
	public editBeeHive(id: string): void {
		this.router.navigate(['EditBeeHive', { id: id }]);
	}
	
	public removeBeeHive(id: string): void {
		this.onBeeHiveDeleted.emit(id);
	}
}