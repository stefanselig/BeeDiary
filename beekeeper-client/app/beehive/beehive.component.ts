import {Component} from 'angular2/core';
@Component({
	templateUrl: 'app/beehive/Templates/beehive.template.html'
})
export class BeeHiveComponent {
	public beehives: any[];
	
	constructor() {
		this.beehives = [];
	}
}