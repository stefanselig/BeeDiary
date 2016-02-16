import {Component, Input} 		from 'angular2/core';
import {Router, RouteParams}	from 'angular2/router';

import {BeeHiveService}	from '../services/beehive.service';
import {MapsService}	from '../services/maps.service';

import {BeeHive} from '../../build-client/BeeHive/BeeHive';

@Component({
	selector: 'viewbeehive',
	templateUrl: 'app/beehive/Templates/viewBeehive.template.html',
	inputs: ['beehive']
})
export class ViewBeeHiveComponent {
	public beehive: BeeHive;
	public viewDetails: boolean = false;
	
	constructor(public beeHiveService: BeeHiveService, public mapsService: MapsService, public router: Router, params: RouteParams) {}
	
	public showDetails(): void {
		this.viewDetails = !this.viewDetails;
	}
	
	public editBeeHive(id: string): void {
		this.router.navigate(['EditBeeHive', { id: id }]);
	}
}