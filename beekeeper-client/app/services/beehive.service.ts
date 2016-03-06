import {Injectable}		from 'angular2/core';
import {Http, Headers}	from 'angular2/http';
import {Observable}		from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as BeeHiveModule from '../model/model/BeeHive/BeeHive';

import {DataService} from './dataservice';
import {AuthService} from './auth.service';

@Injectable()
export class BeeHiveService extends DataService<BeeHiveModule.BeeHive>{
	constructor(http: Http, public auth: AuthService) {
		super(http,'BeeHives/beeHives/', auth);
	}
}

//this.getBeeHivesForSaving();
	/*getBeeHives(): Observable<Array<BeeHiveModule.BeeHive>> {
		return super.getElements(this.path);
	}
	
	getBeeHivesForSaving(): void {
		super.getElementsForSaving(this.path);
	}
	
	getBeeHiveById(): Observable<BeeHiveModule.BeeHive> {
		return super.getElementById(this.path);
	}
	
	deleteBeeHiveById(): Observable<string> {
		return super.deleteElementById(this.path);
	}
	
	createBeeHive(beeHive: BeeHiveModule.BeeHive): Observable<string> {
		return super.createElement(this.path, JSON.stringify(beeHive));
	}
	
	updateBeeHive(beeHive: BeeHiveModule.BeeHive): Observable<string> {
		return super.updateElement(this.path, JSON.stringify(beeHive));
	}*/


	
	 /*public getBeeHiveById(id: string): Observable<BeeHiveModule.BeeHive> {
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
	
	public deleteBeeHiveById(id: string): Observable<string> {
		return this.http
		.delete('http://localhost:8080/api/BeeHives/beeHives/' + id,
			{headers: this.generalHeaders})
		.map(res => res.json());
	}*/

	/*public getEnum(enumType: string): Observable<any> {
		return this.http
				.get('http://localhost:8080/api/BeeHives/' + enumType, 
					{ headers: this.generalHeaders})
				.map(res => res.json());
	}*/
	
	/*public loadEnums(): void {
		this.sourceTypes = this.getEnum('sourceEnum');
		this.frameSizes = this.getEnum('sizeEnum');
		this.frameMaterials = this.getEnum('materialEnum');
		this.combConstructions = this.getEnum('constructionEnum');
	}*/
	
	// Loading enums no longer needed plus make interface or base class for data services.
	// Plus make exportable object for Headers.
	
	//beeHives: Observable<BeeHiveModule.BeeHive[]>;

	
	/*sourceTypes: Observable<BeeHiveModule.sourceEnum[]>;
	frameSizes: Observable<BeeHiveModule.frameSizeEnum[]>;
	frameMaterials: Observable<BeeHiveModule.frameMaterialEnum[]>;
	combConstructions: Observable<BeeHiveModule.combConstructionEnum[]>;*/