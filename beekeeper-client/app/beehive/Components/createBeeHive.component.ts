import {Component} 		from 'angular2/core';
import {Router}			from 'angular2/router';
import {BeeHiveService}	from '../services/beehive.service';
import {MapsService, LocationParams, MarkerObject}	from '../services/maps.service';
import {MapComponent} from './map.component';

@Component({
	selector: 'CreateBeeHive',
	templateUrl: 'app/beehive/Templates/createBeeHive.template.html',
	providers: [BeeHiveService],
	directives: [MapComponent]
})
export class CreateBeeHiveComponent {
	// Refactor to use types from model
	public sourceTypes: any[] = [];
	public frameSizes: any[] = [];
	public frameMaterials: any[] = [];
	public combConstructions: any[] = [];
	
	public newBeeHive: any;
	public location: any;
	public markerObj: MarkerObject;
	
	constructor(public mapsService: MapsService, public beehiveService: BeeHiveService, public router: Router) {
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
		// Refactor to use ? operator
		this.location = {
			lat: 0,
			lng: 0,
			position: undefined,
			markerId: undefined
		};
	}
	
	public callGetCoordinates(): void {
		this.mapsService
		.getCoordinates()
		.then(
			(locParam: LocationParams) => {
				this.location.lat = locParam.lat;
				this.location.lng = locParam.lng;
				this.location.address = locParam.address;
				this.location.position = new google.maps.LatLng(locParam.lat, locParam.lng)
			}
		).then(
			() => this.mapsService.getAddress(this.location)
		).then(
			address => {
				this.location.address = address;
			}
		).then(
			() => {
				this.location.markerId = this.mapsService.createMarker(this.location);
			}
		).then(
			() => {
				this.mapsService.centerMap();
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
	
	/**
	 * Creates a new BeeHives
	 * @param {any} createBeeHiveForm - Form content
	 */
	public createNewBeeHive(createBeeHiveForm: any): void {
		/*this.beehiveService.createBeeHive(this.newBeeHive);
		
		console.log(createBeeHiveForm.value);
		
		this.newBeeHive = {};
		this.router.navigate(['BeeHives']);*/
		
		
		// TODO: Refactor this function
		this.newBeeHive = createBeeHiveForm.value;
		
		delete this.newBeeHive.address;
		delete this.newBeeHive.lat;
		delete this.newBeeHive.long;
		
		this.newBeeHive.hiveLocation = this.location;
		
		this.newBeeHive.source = {
			type: createBeeHiveForm.value.type,
			origin: createBeeHiveForm.value.origin
		}
		
		this.newBeeHive.lost = {
			isLost: createBeeHiveForm.value.isLost,
			reason: createBeeHiveForm.value.reason
		}
		
		this.beehiveService
		.createBeeHive(this.newBeeHive)
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