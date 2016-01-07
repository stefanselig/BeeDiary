import {Component} 		from 'angular2/core';
import {BeeHiveService}	from './beehive.service';
import {MapsService}	from './maps.service';

@Component({
	selector: 'BeeHive',
	templateUrl: 'app/beehive/Templates/beehive.template.html',
	providers: [BeeHiveService, MapsService]
})
export class BeeHiveComponent {
	public beehives: any[];
	public beehiveService: BeeHiveService;
	public mapsService: MapsService;
	
	constructor(beeHiveService: BeeHiveService, mapsService: MapsService) {
		this.beehives = [];
		//this.beehiveService = beeHiveService;
		//this.beehives = this.beehiveService.beeHives.slice();
		
		this.mapsService = mapsService;
	}
	
	public getCoordinates(index: number): void {
		var instance = this;
		navigator.geolocation.getCurrentPosition(position => {
			instance.beehives[index].location.lat = position.coords.latitude;
			instance.beehives[index].location.long = position.coords.longitude;
		});
	}
}