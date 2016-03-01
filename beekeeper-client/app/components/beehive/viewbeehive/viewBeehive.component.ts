import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {BeeHiveService}	from '../../../services/beehive.service';
import {MapsService}	from '../../../services/maps.service';
import {Utilities}		from '../../../services/utilities.service';

import {BeeHive}		from '../../../model/BeeHive/BeeHive';

@Component({
	selector: 'viewbeehive',
	templateUrl: 'app/components/beehive/viewbeehive/viewBeehive.template.html',
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
			margin-top: 25%;
		}
	`]
})
export class ViewBeeHiveComponent {
	public beehive: BeeHive;
	public viewDetails: boolean = false;
	public onBeeHiveDeleted: EventEmitter<string> = new EventEmitter<string>();
	
	constructor(public beeHiveService: BeeHiveService, public mapsService: MapsService, public router: Router, params: RouteParams, public utils: Utilities) {}
	
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