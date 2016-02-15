import {Component, Input} 		from 'angular2/core';
import {Router, RouteParams} 		from 'angular2/router';
import {BeeHiveService}	from '../services/beehive.service';
import {MapsService, LocationParams, MarkerObject}	from '../services/maps.service';
import {BeeHiveComponent} from './beehive.component';
import {CreateBeeHiveComponent} from './createBeeHive.component';

@Component({
	selector: 'viewbeehive',
	templateUrl: 'app/beehive/Templates/viewBeehive.template.html',
	providers: [BeeHiveService, MapsService],
	inputs: ['beehive']
})
export class ViewBeeHiveComponent {
	@Input() public beehive: any = {};
	public viewDetails: boolean = false;
	
	constructor(public beeHiveService: BeeHiveService, public mapsService: MapsService, public router: Router, params: RouteParams) {}
	
	public showDetails(): void {
		this.viewDetails = !this.viewDetails;
	}
	
	public editBeeHive(id: string): void {
		this.router.navigate(['EditBeeHive', { id: id }]);
	}
}