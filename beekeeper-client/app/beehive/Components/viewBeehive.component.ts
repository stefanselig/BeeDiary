import {Component, Input} 		from 'angular2/core';
import {Router} 		from 'angular2/router';
import {RouteParams}	from 'angular2/router';
import {BeeHiveService}	from '../services/beehive.service';
import {MapsService}	from '../services/maps.service';
import {LocationParams} from '../services/maps.service';
import {MarkerObj}		from '../services/maps.service';
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
	
	public beehiveService: BeeHiveService;
	public mapsService: MapsService;
	public router: Router;
	
	constructor(beeHiveService: BeeHiveService, mapsService: MapsService, router: Router, params: RouteParams) {
		this.beehiveService = beeHiveService;
		this.mapsService = mapsService;
		this.router = router;
	}
	
	public showDetails(): void {
		this.viewDetails = !this.viewDetails;
	}
	
	public editBeeHive(id: string): void {
		this.router.navigate(['EditBeeHive', { id: id }]);
	}
}