import {Component} 		from 'angular2/core';
import {Router} 		from 'angular2/router';
import {RouteParams}	from 'angular2/router';
import {BeeHiveService}	from '../services/beehive.service';
import {MapsService}	from '../services/maps.service';
import {BeeHiveComponent} from './beehive.component';
import {CreateBeeHiveComponent} from './createBeeHive.component';

@Component({
	selector: 'editBeeHive',
	templateUrl: 'app/beehive/Templates/editBeehive.template.html',
	providers: [BeeHiveService, MapsService]
})
export class EditBeeHiveComponent {
	// Somehow load selected beehive into component
	public beehive: any;
	
	public beehiveService: BeeHiveService;
	public mapsService: MapsService;
	public router: Router;
	
	constructor(beeHiveService: BeeHiveService, mapsService: MapsService, router: Router, params: RouteParams) {
		this.beehiveService = beeHiveService;
		this.mapsService = mapsService;
		this.router = router;
		
		//this.loadSelectedBeeHiveFromWebService(params.get('id'));
		
		this.beehive = {
			number: 1,
			name: "Beehive 1",
			location: {
				address: "",
				lat: 0,
				long: 0 
			},
			source: {
				type: ""
			},
			lost: {
				isLost: true,
				reason: ""
			}
		};
		
	}
	
	public loadSelectedBeeHiveFromWebService(id: number): void {
		this.beehive = this.beehiveService.getBeeHiveById(id).subscribe(
			selectedBeeHive => this.beehive = selectedBeeHive,
			error => console.error("Error" + error),
			() => {
				console.log("Completed");
				console.log(this.beehive);
			}
		);
	}
	
	public callGetCoordinates(index: number) {
		this.mapsService.getCoordinates(locParam => {
			this.beehive.location.lat = locParam.lat;
			this.beehive.location.long = locParam.long;
		});
	}
	
	public updateBeeHive(): void {
		//this.beehiveService.updateBeeHive(this.beehive);
		this.router.navigate(['BeeHive']);
	}
	
	public cancel(): void {
		this.router.navigate(['BeeHive']);
	}
}