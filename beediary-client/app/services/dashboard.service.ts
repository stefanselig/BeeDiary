import {Injectable}	from 'angular2/core';
import {Http, Headers, RequestOptionsArgs} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable}	from 'rxjs/Observable';

import {AuthService} from './auth.service';

@Injectable()
export class DashBoardService {
	public generalHeaders: Headers;
	public honeyForAll: Observable<any>;
	requestOptions: RequestOptionsArgs;
	
	constructor(public http:Http, public auth: AuthService) {
		this.setHeaders();
		this.getHoneyForAll();
	}
	/** Sets headers by including authentication token */
	setHeaders(): void {
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
		this.generalHeaders.append('token', this.auth.token);
		this.requestOptions = {headers: this.generalHeaders};
	}
	/** HTTP GET call to get honey data for all BeeHives */
	public getHoneyForAll(): void {
		this.setHeaders();
		this.honeyForAll = this.http
		.get('http://localhost:8080/api/Diagrams/honeyPerPopulation', this.requestOptions)
		.map(res => res.json());
	}
	/** HTTP GET call to get honey data for one BeeHive */
	public getHoneyForOne(id: string): Observable<any> {
		this.setHeaders();
		return this.http
		.get(`http://localhost:8080/api/Diagrams/honeyForPopulation/${id}`, this.requestOptions)
		.map(res => res.json());
	}
	/** HTTP GET call to get acarian data */
	public getAcarianData(id: string): Observable<any> {
		this.setHeaders();
		return this.http
		.get(`http://localhost:8080/api/Diagrams/acarianTime/${id}`, this.requestOptions)
		.map(res => res.json());
	}
}