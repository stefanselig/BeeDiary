import {Injectable}	from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable}	from 'rxjs/Observable';

import * as DiaryEntryModule from './../../build-client/DiaryEntry/DiaryEntry';

@Injectable()
export class DiaryEntryService {
	diaryEntries: Observable<DiaryEntryModule.DiaryEntry>;
	public generalHeaders: Headers;
	
	public typeEnum: Observable<DiaryEntryModule.entryTypeEnum[]>;
	public treatmentTypes: Observable<DiaryEntryModule.treatmentTypeEnum[]>;
	public feedingTypes: Observable<DiaryEntryModule.foodTypeEnum[]>;
	
	constructor(public http:Http) {
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
		
		this.getDiaryEntries();
		this.loadEnums();
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
	
	public getEnum(enumType: string): Observable<any> {
		return this.http
			.get('http://localhost:8080/api/DiaryEntries/' + enumType,
				{ headers: this.generalHeaders})
			.map(res => res.json());
	}
	
	public loadEnums(): void {
		this.feedingTypes = this.getEnum('foodEnum');
		this.typeEnum = this.getEnum('typeEnum');
		this.treatmentTypes = this.getEnum('treatmentEnum');
	}
}