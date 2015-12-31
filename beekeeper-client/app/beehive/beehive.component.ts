import {Component} from 'angular2/core';
@Component({
	templateUrl: 'app/beehive/Templates/beehive.template.html'
})
export class BeeHiveComponent {
	public beehives: any[];
	
	constructor() {
		this.beehives = [];
	}
	
	public getCoordinates(index: number): void {
		var instance = this;
		navigator.geolocation.getCurrentPosition(position => {
			instance.beehives[index].location.lat = position.coords.latitude;
			instance.beehives[index].location.long = position.coords.longitude;
		});
	}
}