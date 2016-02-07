import {Component} 		from 'angular2/core';
import {Router} 		from 'angular2/router';
import {BeeHiveService}	from '../services/beehive.service';
import {MapsService}	from '../services/maps.service';
import {CreateBeeHiveComponent} from './createBeeHive.component';
import {ViewBeeHiveComponent} from './viewBeeHive.component';

@Component({
	selector: 'BeeHives',
	templateUrl: 'app/beehive/Templates/beehives.template.html',
	providers: [BeeHiveService, MapsService],
	directives: [ViewBeeHiveComponent]
})
export class BeeHiveComponent {
	public allBeehives: any[] = [];
	public beehives: any[] = [];
	public elementsStrings: string[] = [];
	
	public beehiveService: BeeHiveService;
	public mapsService: MapsService;
	public router: Router;
	
	constructor(beeHiveService: BeeHiveService, mapsService: MapsService, router: Router) {
		this.beehiveService = beeHiveService;
		this.mapsService = mapsService;
		this.router = router;
		this.loadInitialDataFromWebService();
	}
	
	public loadInitialDataFromWebService(): void {
		this.beehiveService.beeHives.subscribe(
			res => {
				this.allBeehives = res.slice();
				this.beehives = this.allBeehives.slice();
				this.getStringsForSearch();
				this.beehives.map(e => e.hiveLocation.marker = this.mapsService.getMarker(e.hiveLocation));
				this.mapsService.centerMap();
			},
			error => console.error("Error" + error),
			() => {
				console.log("Completed");
				console.log(this.beehives);
			}
		);
	}
	
	public getStringsForSearch(): void {
		this.beehives.map(e => this.elementsStrings.push(JSON.stringify(e)));
	}
	
	
	public callGetCoordinates(index: number) {
		this.mapsService
		.getCoordinates()
		.done(res => {
			this.beehives[index].location.lat = res.lat;
			this.beehives[index].location.long = res.long;
		})
		.catch(err => console.error(err));
	}
	
	public createBeeHive(): void {
		this.router.navigate(['CreateBeeHive']);
	}
	
	public search(formContent: any): void {
		var query: string = formContent.value.query;
		this.beehives.length = 0;
		if (query == undefined)
			this.beehives = this.allBeehives.slice();
		else {
			this.elementsStrings
			.filter(e => e.toUpperCase().indexOf(query.toUpperCase()) != -1)
			.forEach(e => this.allBeehives
				.filter(x => x._id == JSON.parse(e)._id)
				.map(y => this.beehives.push(y)));	
		}
	}
}