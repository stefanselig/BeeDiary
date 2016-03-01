import {Injectable}	from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable}	from 'rxjs/Observable';

@Injectable()
export class DashBoardService {
	public generalHeaders: Headers;
	public honeyForAll: Observable<any>;
	
	constructor(public http:Http) {
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
		this.getHoneyForAll();	
	}
	
	public getHoneyForAll(): void {
		this.honeyForAll = this.http
		.get('http://localhost:8080/api/Diagrams/honeyPerPopulation')
		.map(res => res.json());
	}
	
	public getHoneyForOne(id: string): Observable<any> {
		return this.http
		.get('http://localhost:8080/api/Diagrams/honeyForPopulation/' + id)
		.map(res => res.json());
	}
	
	public getAcarianData(id: string): Observable<any> {
		return this.http
		.get('http://localhost:8080/api/Diagrams/acarianTime/' + id)
		.map(res => res.json());
	}
}