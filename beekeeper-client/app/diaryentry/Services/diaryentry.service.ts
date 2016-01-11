import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DiaryEntryService {
	http: Http;
	diaryEntries: any[];
	
	constructor(http:Http) {
		this.http = http;
		//this.getDiaryEntries();
	}
	
	public getDiaryEntries(): void {
		this.diaryEntries = this.http
		.get('http://localhost:8080/api/DiaryEntries/diaryEntries')
		.map
		(
			response => response.json()
		);
	}
	
	public getDiaryEntryById(id: number): any {
		// Somehow pass ID
		return this.http
		.get()
		.map(
			response => response.json()	
		);
	}
	
	public updateDiaryEntry(diaryEntry: any): void {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		// Somehow pass ID
		this.http
		.post(
			'http://localhost:8080/api/DiaryEntries/diaryEntries',
			JSON.stringify(diaryEntry),
			{
				headers: headers
			}
		).subscribe(
			res => window.alert(res.json())
		);
	}
	
	public createDiaryEntry(diaryEntry: any): void {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		this.http
		.post(
			'http://localhost:8080/api/DiaryEntries/diaryEntries',
			JSON.stringify(diaryEntry),
			{
				headers: headers
			}
		).subscribe(
			res => window.alert(res.json())
		);
	}
}