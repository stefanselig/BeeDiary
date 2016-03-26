import {Injectable}	from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable}	from 'rxjs/Observable';

import * as DiaryEntryModule from '../model/model/DiaryEntry/DiaryEntry';

import {DataService} from './dataservice';
import {AuthService} from './auth.service';

@Injectable()
export class DiaryEntryService extends DataService<DiaryEntryModule.DiaryEntry> {
	// Find a better solution for this:
	beehiveNamesAndIdsMap: Observable<any[]>;
	
	constructor(http:Http, public auth:AuthService) {
		super(http, 'DiaryEntries/diaryEntries/', auth);
		this.getBeeHiveNamesAndIds();
	}
	
	// Find a better solution for this:
	getBeeHiveNamesAndIds(): void {
		this.beehiveNamesAndIdsMap = this.http
			.get('http://localhost:8080/api/BeeHives/BeeHiveNames', {headers: this.generalHeaders})
			.map(res => res.json());
	}
}