import {Injectable}	from 'angular2/core';
import {Router}		from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable}	from 'rxjs/Observable';

import * as DiaryEntryModule from '../model/model/DiaryEntry/DiaryEntry';

import {DataService} from './dataservice';
import {AuthService} from './auth.service';

@Injectable()
export class DiaryEntryService extends DataService<DiaryEntryModule.DiaryEntry> {
	beehiveNamesAndIdsMap: Observable<any[]>;
	
	constructor(http:Http, public auth:AuthService, router: Router) {
		super(http, 'DiaryEntries/diaryEntries/', router, auth);
		this.getBeeHiveNamesAndIds();
	}
	/** Gets an object that contains the BeeHiveNames and Ids */
	getBeeHiveNamesAndIds(): void {
		this.beehiveNamesAndIdsMap = this.http
			.get('http://localhost:8080/api/BeeHives/BeeHiveNames', {headers: this.generalHeaders})
			.map(res => res.json());
	}
}