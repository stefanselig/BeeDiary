import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';
@Injectable()
export class BeeHiveService {
	http: Http;
	beeHives: any;
	generalHeaders: Headers;
	
	sourceTypes: any[];
	frameSizes: any[];
	frameMaterials: any[];
	combConstructions: any[];
	
	constructor(http:Http) {
		this.http = http;
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
	
	public getBeeHiveById(id: string): Observable {
		return this.http
		.get('http://localhost:8080/api/BeeHives/beeHives/' + id,
			{headers: this.generalHeaders})
		.map(res => res.json());
	}
	
	public updateBeeHive(beeHive: any): Observable {
		return this.http
		.put(
			'http://localhost:8080/api/BeeHives/beeHives/' + beeHive._id,
			JSON.stringify(beeHive),
			{ headers: this.generalHeaders }
		).map(res => res.json());
	}
	
	public createBeeHive(beeHive: any): Promise {
		return new Promise((resolve, reject) => {
			this.http
			.post(
				'http://localhost:8080/api/BeeHives/beeHives',
				JSON.stringify(beeHive),
				{
					headers: this.generalHeaders
				}
			)
			.map(res => res.json())
			.subscribe(
				res => resolve(res),
				err => reject(err)
			);
		});
	}
	
	public getEnum(enumType: string): Promise {
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
	
	public loadEnums(): Promise {
		return new Promise((resolve, reject) => {
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
		});
	}
}