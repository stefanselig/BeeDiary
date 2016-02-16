import {Injectable}		from 'angular2/core';
import {Http, Headers}	from 'angular2/http';
import {Observable}		from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as BeeHiveModule from '../../build-client/BeeHive/BeeHive';

@Injectable()
export class BeeHiveService {
	beeHives: Observable<BeeHiveModule.BeeHive[]>;
	generalHeaders: Headers;
	
	sourceTypes: Observable<BeeHiveModule.sourceEnum[]>;
	frameSizes: Observable<BeeHiveModule.frameSizeEnum[]>;
	frameMaterials: Observable<BeeHiveModule.frameMaterialEnum[]>;
	combConstructions: Observable<BeeHiveModule.combConstructionEnum[]>;
	
	constructor(public http:Http) {
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
		
		this.getBeeHives();
		this.loadEnums();
	}
	
	 public getBeeHives(): void {
		this.beeHives = this.http
		.get('http://localhost:8080/api/BeeHives/beeHives')
		.map(
			response => response.json()
		);
	}
	
	 public getBeeHiveById(id: string): Observable<BeeHiveModule.BeeHive> {
		return this.http
		.get('http://localhost:8080/api/BeeHives/beeHives/' + id,
			{headers: this.generalHeaders})
		.map(res => res.json());
	}
	
	public updateBeeHive(beeHive: any): Observable<string> {
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
	
	public getEnum(enumType: string): Observable<any> {
		return this.http
				.get('http://localhost:8080/api/BeeHives/' + enumType, 
					{ headers: this.generalHeaders})
				.map(res => res.json());
	}
	
	public loadEnums(): void {
		this.sourceTypes = this.getEnum('sourceEnum');
		this.frameSizes = this.getEnum('sizeEnum');
		this.frameMaterials = this.getEnum('materialEnum');
		this.combConstructions = this.getEnum('constructionEnum');
	}
}