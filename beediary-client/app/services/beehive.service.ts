import {Injectable}		from 'angular2/core';
import {Router}			from 'angular2/router';
import {Http, Headers}	from 'angular2/http';
import {Observable}		from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as BeeHiveModule from '../model/model/BeeHive/BeeHive';

import {DataService} from './dataservice';
import {AuthService} from './auth.service';

@Injectable()
export class BeeHiveService extends DataService<BeeHiveModule.BeeHive>{
	constructor(http: Http, public auth: AuthService, router: Router) {
		super(http,'BeeHives/beeHives/', router, auth);
	}
}