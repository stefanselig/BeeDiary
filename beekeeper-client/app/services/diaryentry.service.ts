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

	/*public getElements(): Observable<DiaryEntryModule.DiaryEntry[]> {
		return this.http
		.get('http://localhost:8080/api/DiaryEntries/diaryEntries')
		.map(res => res.json());
	}
	
	public getDiaryEntries(): void {
		this.diaryEntries = this.http
		.get('http://localhost:8080/api/DiaryEntries/diaryEntries')
		.map(res => res.json());
	}
	
	public getDiaryEntryById(id: string): Observable<DiaryEntryModule.DiaryEntry> {
		return this.http
		.get('http://localhost:8080/api/DiaryEntries/diaryEntries/' + id,
			{ headers: this.generalHeaders})
		.map(res => res.json());
	}
	
	public updateDiaryEntry(diaryEntry: any): Observable<string> {
		return this.http
		.put(
			'http://localhost:8080/api/DiaryEntries/diaryEntries/' + diaryEntry._id,
			JSON.stringify(diaryEntry),
			{ headers: this.generalHeaders })
		.map(res => res.json());
	}
	
	public createDiaryEntry(diaryEntry: any): Observable<string> {
		return this.http
		.post(
			'http://localhost:8080/api/DiaryEntries/diaryEntries',
			JSON.stringify(diaryEntry),
			{ headers: this.generalHeaders }
		).map(res => res.json());
	}
	
	public deleteDiaryEntryById(id: string): Observable<string> {
		return this.http
			.delete(
				'http://localhost:8080/api/DiaryEntries/diaryEntries/' + id,
				{ headers: this.generalHeaders })
			.map(res => res.json());
	}
	
	public getBeeHiveNamesAndIds(): void {
		this.beehiveNamesAndIdsMap = this.http
			.get('http://localhost:8080/api/BeeHives/BeeHiveNames', {headers: this.generalHeaders})
			.map(res => res.json());
	}*/
	
	/*public getEnum(enumType: string): Observable<any> {
		return this.http
			.get('http://localhost:8080/api/DiaryEntries/' + enumType,
				{ headers: this.generalHeaders})
			.map(res => res.json());
	}
	
	public loadEnums(): void {
		this.feedingTypes = this.getEnum('foodEnum');
		this.typeEnum = this.getEnum('typeEnum');
		this.treatmentTypes = this.getEnum('treatmentEnum');
	}*/