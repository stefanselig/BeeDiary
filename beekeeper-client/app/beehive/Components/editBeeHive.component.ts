import {Component} 		from 'angular2/core';
import {Router, RouteParams} 		from 'angular2/router';
import {BeeHiveService}	from '../services/beehive.service';
import {MapsService, LocationParams, MarkerObject}	from '../services/maps.service';
import {MapComponent} from './map.component';
import {BeeHiveComponent} from './beehive.component';
import {CreateBeeHiveComponent} from './createBeeHive.component';

@Component({
	selector: 'editBeeHive',
	templateUrl: 'app/beehive/Templates/editBeehive.template.html',
	providers: [BeeHiveService],
	directives: [MapComponent]
})
export class EditBeeHiveComponent {
	public beehive: any = {hiveLocation: {}, source: {}, lost: {}};
	
	public sourceTypes: any[];
	public frameSizes: any[];
	public frameMaterials: any[];
	public combConstructions: any[];
	
	public isMapLoaded: boolean = false;
	public isBeehiveLoaded: boolean = false;
	
	constructor(public beehiveService: BeeHiveService, public mapsService: MapsService, public router: Router, params: RouteParams) {
		this.loadEnums();
		this.loadSelectedBeeHive(params.get('id'));
	}
	
	public loadEnums(): void {
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
			.catch(err => console.log(err));
	}
	
	public loadSelectedBeeHive(id: string): void {
		this.beehiveService
		.getBeeHiveById(id)
		.subscribe(
			res => {
				this.beehive = res;
				this.isBeehiveLoaded = true;
				if (this.isMapLoaded) {
					this.mapsService.assignMapToMarkers(this.beehive.hiveLocation.markerId);
				}
			},
			err => console.error(err)
		);
	}
	
	public callCenterMap(eventArgs: string): void {
		this.isMapLoaded = true;
		if (this.isBeehiveLoaded) {
			this.mapsService.assignMapToMarkers(this.beehive.hiveLocation.markerId);
		}
		this.mapsService.centerMap();
	}
	
	public callGetCoordinates(index: number) {
		this.mapsService
		.getCoordinates()
		.then(
			(locParam: LocationParams) => {
				this.beehive.hiveLocation.lat = locParam.lat;
				this.beehive.hiveLocation.long = locParam.lng;
				this.beehive.hiveLocation.address = locParam.address;
			}
		).then(() => this.mapsService.getAddress(this.beehive.hiveLocation))
		 .then(address => this.beehive.hiveLocation.address = address)
		 .then(
			() => this.beehive.hiveLocation.markerId = this.mapsService.createMarker({
				lat: this.beehive.hiveLocation.lat,
				lng: this.beehive.hiveLocation.lng,
				position: new google.maps.LatLng(this.beehive.hiveLocation.lat,this.beehive.hiveLocation.lng)
			})
		).then(() => this.mapsService.centerMap())
		 .catch(
			(error, error_message?) => {
				console.log(error);
				if (error_message != undefined) {
					console.log(error_message);	
				}
			}
		 );
	}
	
	public updateBeeHive(): void {
		this.beehiveService
		.updateBeeHive(this.beehive)
		.subscribe(
			res => console.log(res),
			err => console.log(err),
			()  => this.router.navigate(['BeeHives'])
		);
	}
	
	public cancel(): void {
		this.router.navigate(['BeeHives']);
	}
}