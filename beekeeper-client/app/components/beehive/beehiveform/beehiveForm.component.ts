import {Component} from 'angular2/core';

import {Observable} from 'rxjs/Observable';

import {BeeHiveService} from '../../../services/beehive.service';
import {MapsService} from '../../../services/maps.service';

import * as BeeHiveModel from '../../../model/model/BeeHive/BeeHive';
import {Photo} from '../../../model/model/DiaryEntry/DiaryEntry';

@Component({
	selector: 'beehiveform',
	templateUrl: 'app/components/beehive/beehiveform/beehiveForm.template.html',
	styles: [`
		.beehiveForm {
			height: 70%;
			overflow: auto;
		}
		.ng-valid[required] {
			border-left: 5px solid #42A948; /* green */
		}
		.ng-invalid {
			border-left: 5px solid #a94442; /* red */
		}
	`],
	inputs: ['beehive']
})
export class BeeHiveForm {
	public beehive: BeeHiveModel.BeeHive;
	
	sourceTypes: string[] = BeeHiveModel.sources;
	frameSizes: string[] = BeeHiveModel.frameSizes;
	frameMaterials: string[] = BeeHiveModel.frameMaterials;
	combConstructions: string[] = BeeHiveModel.combConstructions;
	
	constructor(public beehiveService: BeeHiveService, public mapsService: MapsService) {}
	
	public callGetCoordinates(): void {
		let marker: google.maps.Marker;
			this.mapsService.getCoordinates()
			.then(
				(res: BeeHiveModel.HiveLocation) => {
					// this.beehive.hiveLocation.lat = +res.lat.toFixed(2);
					// this.beehive.hiveLocation.lng = +res.lng.toFixed(2);
					this.beehive.hiveLocation.lat = res.lat;
					this.beehive.hiveLocation.lng = res.lng;
					this.beehive.hiveLocation.position = new google.maps.LatLng(res.lat, res.lng);
				}
			).then(() => this.mapsService.getAddress(this.beehive.hiveLocation))
			 .then((address:string) => {this.beehive.hiveLocation.address = address;})
			 .then(() => {
				marker = this.mapsService.createMarker(this.beehive.hiveLocation);
				this.mapsService.assignMarkerToMap(this.beehive._id || undefined, marker);
				this.mapsService.setInfoWindowText(this.beehive.hiveName, this.beehive._id || null, marker);
				this.mapsService.centerMap(marker);
			 })
			 .catch((err, err_msg?) => {
				  console.log(err);
				  if (err_msg != undefined) {
					  console.log(err_msg);
				  }
			  });
	}
	
	public handlePhoto(photo): void {
		const reader = new FileReader();
		if (photo[0]) {
			reader.readAsDataURL(photo[0]);
			reader.addEventListener("load", () => {
				this.beehive.photo = new Photo(0,reader.result);
			});
		}
	}
	
	public deletePhoto(filePicker: HTMLInputElement): void {
		filePicker.value = "";
		this.beehive.photo = undefined;
	}
}