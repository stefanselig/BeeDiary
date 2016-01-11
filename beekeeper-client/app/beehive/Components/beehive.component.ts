import {Component} 		from 'angular2/core';
import {Router} 		from 'angular2/router';
import {BeeHiveService}	from '../services/beehive.service';
import {MapsService}	from '../services/maps.service';
import {CreateBeeHiveComponent} from './createBeeHive.component';

@Component({
	selector: 'BeeHive',
	templateUrl: 'app/beehive/Templates/beehive.template.html',
	providers: [BeeHiveService, MapsService]
})
export class BeeHiveComponent {
	// These fields will be assigned trough REST data:
	public beehives: any[];
	
	public beehiveService: BeeHiveService;
	public mapsService: MapsService;
	public router: Router;
	
	constructor(beeHiveService: BeeHiveService, mapsService: MapsService, router: Router) {
		this.beehives = [];
		
		this.beehiveService = beeHiveService;
		this.mapsService = mapsService;
		this.router = router;
		
		//this.loadInitialDataFromWebService();	
	}
	
	public loadInitialDataFromWebService(): void {
		this.beehiveService.beeHives.subscribe(
			beeHives => this.beehives = beeHives.slice(),
			error => console.error("Error" + error),
			() => {
				console.log("Completed");
				console.log(this.beehives);
			}
		);
	}
	
	public callGetCoordinates(index: number) {
		this.mapsService.getCoordinates(locParam => {
			this.beehives[index].location.lat = locParam.lat;
			this.beehives[index].location.long = locParam.long;
		});
	}
	
	public createBeeHive(): void {
		this.router.navigate(['CreateBeeHive']);
	}
	
	public editBeeHive(id: number): void {
		this.router.navigate(['EditBeeHive'], { id: id });
	}
}