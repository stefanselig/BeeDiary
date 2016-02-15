import {Injectable}		from 'angular2/core';
import {Http, Headers}	from 'angular2/http';
import {Observable}		from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BeeHiveService {
	// TODO: Refactor beehives to use shared model
	beeHives: any;
	generalHeaders: Headers;
	
	sourceTypes: any[];
	frameSizes: any[];
	frameMaterials: any[];
	combConstructions: any[];
	
	constructor(public http:Http) {
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
		
		this.getBeeHives();
	}
	
	 public getBeeHives(): void {
		this.beeHives = this.http
		.get('http://localhost:8080/api/BeeHives/beeHives')
		.map(
			response => response.json()
		);
	}
	
	 public getBeeHiveById(id: string): Observable<any> {
		return this.http
		.get('http://localhost:8080/api/BeeHives/beeHives/' + id,
			{headers: this.generalHeaders})
		.map(res => res.json());
	}
	
	public updateBeeHive(beeHive: any): Observable<any> {
		return this.http
		.put(
			'http://localhost:8080/api/BeeHives/beeHives/' + beeHive._id,
			JSON.stringify(beeHive),
			{ headers: this.generalHeaders }
		).map(res => res.json());
	}
	
	public createBeeHive(beeHive: any): Observable<string> {
		return this.http
		.post('http://localhost:8080/api/BeeHives/beeHives',
			JSON.stringify(beeHive),
			{headers: this.generalHeaders})
		.map(res => res.json());
	}
	
	public getEnum(enumType: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http
			.get(
				'http://localhost:8080/api/BeeHives/' + enumType, 
				{ headers: this.generalHeaders})
			.map(res => res.json())
			.subscribe(
				res => resolve(res),
				err => reject(err)
			)
		});
	}
	
	public loadEnums(): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const promise1 = this.getEnum('sourceEnum');
			const promise2 = this.getEnum('sizeEnum');
			const promise3 = this.getEnum('materialEnum');
			const promise4 = this.getEnum('constructionEnum');
			Promise.all([promise1, promise2, promise3, promise4])
					.then((values: any[]) => {
						this.sourceTypes = values[0].slice();
						this.frameSizes = values[1].slice();
						this.frameMaterials = values[2].slice();
						this.combConstructions = values[3].slice();
						resolve("Loading enums was successful.");
					}).catch((err) => reject(err));
		});
		/*return new Promise((resolve, reject) => {
			this.getEnum('sourceEnum')
			.then(
				res => { this.sourceTypes = res.slice(); }
			)
			.then(
				() => this.getEnum('sizeEnum')
			)
			.then(
				res => { this.frameSizes = res.slice(); }
			)
			.then(
				() => this.getEnum('materialEnum')
			)
			.then(
				res => { this.frameMaterials = res.slice(); }
			)
			.then(
				() => this.getEnum('constructionEnum')
			)
			.then(
				res => {this.combConstructions = res.slice();}
			)
			.then( 
				() => resolve("Finished loading enums.")
			)
			.catch(
				err => reject(err)
			);
		});*/
	}
}