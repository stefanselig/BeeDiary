import {Component} 		from 'angular2/core';
import {Router} 		from 'angular2/router';
import {RouteParams}	from 'angular2/router';
import {BeeHiveService}	from '../services/beehive.service';
import {MapsService}	from '../services/maps.service';
import {LocationParams} from '../services/maps.service';
import {MarkerObj}		from '../services/maps.service';
import {BeeHiveComponent} from './beehive.component';
import {CreateBeeHiveComponent} from './createBeeHive.component';

@Component({
	selector: 'editBeeHive',
	templateUrl: 'app/beehive/Templates/editBeehive.template.html',
	providers: [BeeHiveService, MapsService]
})
export class EditBeeHiveComponent {
	public beehive: any = {hiveLocation: {}, source: {}, lost: {}};
	
	public beehiveService: BeeHiveService;
	public mapsService: MapsService;
	public router: Router;
	public sourceTypes: any[];
	public frameSizes: any[];
	public frameMaterials: any[];
	public combConstructions: any[];
	
	constructor(beeHiveService: BeeHiveService, mapsService: MapsService, router: Router, params: RouteParams) {
		this.beehiveService = beeHiveService;
		this.mapsService = mapsService;
		this.router = router;
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
			.catch(
				err => console.log(err)
			);
	}
	
	public loadSelectedBeeHive(id: string): void {
		this.beehiveService
		.getBeeHiveById(id)
		.subscribe(
			res => {
				this.beehive = res;
				console.log("result: ");
				console.log(res);
			},
			err => console.error(err),
			() => console.log("Completed")
		);
	}
	
	public callGetCoordinates(index: number) {
		this.mapsService
		.getCoordinates()
		.then(
			(locParam: LocationParams) => {
				this.beehive.hiveLocation.lat = locParam.lat;
				this.beehive.hiveLocation.long = locParam.long;
				this.beehive.hiveLocation.address = locParam.address;
			}
		).then(
			() => this.mapsService.getAddress(this.beehive.hiveLocation)
		).then(
			address => this.beehive.hiveLocation.address = address
		).catch(
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
			() => {
				console.log("Update completed");
				this.router.navigate(['BeeHives']);
			}
		);
	}
	
	public cancel(): void {
		this.router.navigate(['BeeHives']);
	}
}