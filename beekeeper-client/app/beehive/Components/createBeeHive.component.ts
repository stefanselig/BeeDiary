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
		
		this.beehiveService = beeHiveService;
		this.mapsService = mapsService;
		this.router = router;
		
		this.beehiveService
		.loadEnums()
		.then(
			res => {
				this.sourceTypes = this.beehiveService.sourceTypes.slice();
				this.frameSizes = this.beehiveService.frameSizes.slice();
				this.frameMaterials = this.beehiveService.frameMaterials.slice();
				this.combConstructions = this.beehiveService.combConstructions.slice();
			}
		)
		.catch(
			err => console.log(err)
		);
		
		this.location = {
			lat: 0,
			long: 0,
			address: ""
		};
	}
	
	public callGetCoordinates(): void {
		// Check if instance is needed
		this.mapsService
		.getCoordinates()
		.then(
			(locParam: LocationParams) => {
				this.location.lat = locParam.lat;
				this.location.long = locParam.long;
				this.location.address = locParam.address;
			}
		).then(
			() => this.mapsService.getAddress(this.location)
		).then(
			address => {
				this.location.address = address;
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
		/*this.beehiveService.createBeeHive(this.newBeeHive);
		
		console.log(createBeeHiveForm.value);
		
		this.newBeeHive = {};
		this.router.navigate(['BeeHives']);*/
		this.newBeeHive = createBeeHiveForm.value;
		
		this.beehiveService
		.createBeeHive(this.newBeeHive)
		.then(
			res => {
				console.log(res);
				this.router.navigate(['BeeHives']);	
			}
		)
		.catch(err => console.log(err));
	}
	
	public cancel(): void {
		this.router.navigate(['BeeHives']);
	}
}