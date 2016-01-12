import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';
@Injectable()
export class BeeHiveService {
	http: Http;
	beeHives: any;
	
	constructor(http:Http) {
		this.http = http;
		this.getBeeHives();
	}
	
	public getBeeHives(): void {
		this.beeHives = this.http
		.get('http://localhost:8080/api/BeeHives/beeHives')
		.map(
			response => response.json()
		);
	}
	
	public getBeeHiveById(id: number): any {
		// Somehow pass ID
		return this.http
		.get()
		.map(
			response => response.json()	
		);
	}
	
	public updateBeeHive(beeHive: any): void {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		// Somehow pass ID
		this.http
		.post(
			'http://localhost:8080/api/BeeHives/beeHives',
			JSON.stringify(beeHive),
			{
				headers: headers
			}
		).subscribe(
			res => window.alert(res.json())
		);
	}
	
	public createBeeHive(beeHive: any): void {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		this.http
		.post(
			'http://localhost:8080/api/BeeHives/beeHives',
			JSON.stringify(beeHive),
			{
				headers: headers
			}
		).subscribe(
			res => window.alert(res.json())
		);
	}
}