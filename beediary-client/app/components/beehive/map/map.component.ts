import {Component, AfterViewInit, EventEmitter}	from 'angular2/core';
import {MapsService} from '../../../services/maps.service';
@Component({
	selector: 'map',
	template: `
		<div class="map" [id]="mapsService.MAP_ID"></div>
	`,
	styles: [`
		.map {
			height: 70%;
		}
	`],
	inputs: ['latitude', 'longitude'],
	outputs: ['afterMapInit']
})
export class MapComponent implements AfterViewInit {
	public latitude: number;
	public longitude: number;
	public afterMapInit: EventEmitter<string> = new EventEmitter<string>();
	
	constructor(public mapsService: MapsService) {}
	/** Fires an event when map is ready */
	ngAfterViewInit(): void {
		this.mapsService
			.initMap(this.latitude, this.longitude)
			.then((message: string) => {
				this.afterMapInit.emit(message);
				console.log(message);
			})
			.catch(err => console.log(err));
	}
}