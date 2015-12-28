import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
	constructor(http:Http) {
		this.people = http.get('http://localhost:8080/api').map(response => response.json());
	}
}