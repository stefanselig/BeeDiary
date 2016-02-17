import {Component} from 'angular2/core';

import {BeeHiveService} from '../services/beehive.service';
import {MapsService, LocationParams}	from '../services/maps.service';

import {
	BeeHive,
	sourceEnum,
	frameSizeEnum,
	frameMaterialEnum,
	combConstructionEnum
} from '../../build-client/BeeHive/BeeHive';


@Component({
	selector: 'beehiveform',
	templateUrl: 'app/beehive/Templates/beehiveForm.template.html',
	styles: [`
		.beehiveForm {
			height: 70%;
			overflow: auto;
		}
	`],
	inputs: ['beehive']
})
export class BeeHiveForm {
	public beehive: BeeHive;
	
	public sourceTypes: sourceEnum[];
	public frameSizes: frameSizeEnum[];
	public frameMaterials: frameMaterialEnum[];
	public combConstructions: combConstructionEnum[];
	
	constructor(public beehiveService: BeeHiveService, public mapsService: MapsService) {
		this.loadEnums();
	}
	
	public callGetCoordinates(): void {
		this.mapsService
			.getCoordinates()
			.then(
				(res: LocationParams) => {
					this.beehive.hiveLocation.lat = +res.lat.toFixed(2);
					this.beehive.hiveLocation.lng = +res.lng.toFixed(2);
					this.beehive.hiveLocation.position = new google.maps.LatLng(res.lat, res.lng);
				}
			).then(() => this.mapsService.getAddress(this.beehive.hiveLocation))
			 .then((address:string) => {this.beehive.hiveLocation.address = address;})
			 .then(() => this.beehive.hiveLocation.markerId = this.mapsService.createMarker({
				 lat: this.beehive.hiveLocation.lat,
				 lng: this.beehive.hiveLocation.lng,
				 position: this.beehive.hiveLocation.position
			 }))
			 .then(() => this.mapsService.centerMap())
			 .then(() => this.mapsService.setInfoWindowText(this.beehive.hiveName, this.beehive.hiveLocation.markerId))
			 .catch((err, err_msg?) => {
				  console.log(err);
				  if (err_msg != undefined) {
					  console.log(err_msg);
				  }
			  });
	}
	
	public loadEnums(): void {
		this.beehiveService.sourceTypes.subscribe(
			(res: sourceEnum[]) => this.sourceTypes =  res.slice(),
			err => console.log(err)
		);
		this.beehiveService.frameSizes.subscribe(
			(res: frameSizeEnum[]) => this.frameSizes =  res.slice(),
			err => console.log(err)
		);
		this.beehiveService.frameMaterials.subscribe(
			(res: frameMaterialEnum[]) => this.frameMaterials =  res.slice(),
			err => console.log(err)
		);
		this.beehiveService.combConstructions.subscribe(
			(res: combConstructionEnum[]) => this.combConstructions =  res.slice(),
			err => console.log(err)
		);
	}
}