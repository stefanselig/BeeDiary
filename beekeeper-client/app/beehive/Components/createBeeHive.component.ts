import {Component} 		from 'angular2/core';
import {Router}			from 'angular2/router';
import {BeeHiveService}	from '../services/beehive.service';
import {MapsService}	from '../services/maps.service';
import {LocationParams} from '../services/maps.service';
import {MarkerObj}		from '../services/maps.service';

@Component({
	selector: 'CreateBeeHive',
	templateUrl: 'app/beehive/Templates/createBeeHive.template.html',
	providers: [BeeHiveService, MapsService]
})
export class CreateBeeHiveComponent {
	public sourceTypes: any[];
	public frameSizes: any[];
	public frameMaterials: any[];
	public combConstructions: any[];
	
	public newBeeHive: any;
	public location: LocationParams;
	public markerObj: MarkerObj;
	
	public beehiveService: BeeHiveService;
	public mapsService: MapsService;
	public router: Router;
	
	constructor(mapsService: MapsService, beeHiveService: BeeHiveService, router: Router) {
		this.sourceTypes = [];
		this.frameSizes = [];
		this.frameMaterials = [];
		this.combConstructions = [];
		
		// Placeholder until web service for that use case is available:
		this.sourceTypes = ["aa", "bb", "cv", "ddf", "Other"];
		this.frameSizes = ["aa", "bb", "cv", "ddf", "edfa"];
		this.frameMaterials = ["aa", "bb", "cv", "ddf", "edfa"];
		this.combConstructions = ["aa", "bb", "cv", "ddf", "edfa"];
		
		this.beehiveService = beeHiveService;
		this.mapsService = mapsService;
		this.router = router;
		
		this.location = {
			lat: 0,
			long: 0,
			address: ""
		};
	}
	
	public callGetCoordinates(): void {
		var instance = this;
		this.mapsService
		.getCoordinates()
		.then(
			(locParam: LocationParams) => {
				instance.location.lat = locParam.lat;
				instance.location.long = locParam.long;
				instance.location.address = locParam.address;
			}
		).then(
			() => instance.mapsService.getAddress(instance.location)
		).then(
			address => {
				instance.location.address = address;
			}
		)
		.catch(
			(error, error_message?) => {
				console.log(error);
				if (error_message != undefined) {
					console.log(error_message);	
				}
			}
		);
	}
	
	public createNewBeeHive(createBeeHiveForm: any): void {
		//this.beehiveService.createBeeHive(this.newBeeHive);
		
		console.log(createBeeHiveForm.value);
		
		this.newBeeHive = {};
		this.router.navigate(['BeeHive']);
	}
	
	public cancel(): void {
		this.router.navigate(['BeeHive']);
	}
}