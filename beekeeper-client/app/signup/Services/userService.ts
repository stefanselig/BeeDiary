import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable}	from 'rxjs/Observable';

@Injectable()
export class UserService {
	http: Http;
	test: any;
	people: Observable<any>;
	
	constructor(http:Http) {
		this.http = http;
		this.people = http.get('http://localhost:8080/api').map(response => response.json());
	}
	
	createUser(user: any) {
		console.log(JSON.stringify(user));
		console.log(user);
		
		var headers = new Headers();
		//headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('Content-Type', 'application/json');
		
		//var data = "name=" + user.username + "&email=" + user.email + "&password=" + user.password;
		var data = JSON.stringify(user);
		this.http.post('http://localhost:8080/api/users', data, { 
			headers: headers
		}).subscribe(
			res => {
				this.test = res.json();
				console.log(this.test);
			}
		);
	}
}