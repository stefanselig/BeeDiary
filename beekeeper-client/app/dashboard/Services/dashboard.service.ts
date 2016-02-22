import {Injectable}	from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable}	from 'rxjs/Observable';

@Injectable()
export class DashBoardService {
	generalHeaders: Headers;
	
	constructor(public http:Http) {
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
	}
	
	public getData(): Observable<any> {
		return this.http
		.get('http://localhost:8080/api/DashboardData')
		.map(res => res.json());
	}
	
	public getDiaryEntries(): Observable<any> {
		return this.http
		.get('http://localhost:8080/api/DiaryEntries/diaryEntries')
		.map(res => res.json());
	}
	
	public getDiaryEntryById(id: string): Observable<any> {
		return this.http
		.get('http://localhost:8080/api/DiaryEntries/diaryEntries/' + id,
			{ headers: this.generalHeaders})
		.map(res => res.json());
	}
	
	public updateDiaryEntry(diaryEntry: any): Observable<any> {
		return this.http
		.put(
			'http://localhost:8080/api/DiaryEntries/diaryEntries/' + diaryEntry._id,
			JSON.stringify(diaryEntry),
			{ headers: this.generalHeaders })
		.map(res => res.json());
	}
	
	public createDiaryEntry(diaryEntry: any): Observable<any> {
		return this.http
		.post(
			'http://localhost:8080/api/DiaryEntries/diaryEntries',
			JSON.stringify(diaryEntry),
			{ headers: this.generalHeaders }
		).map(res => res.json());
	}
}