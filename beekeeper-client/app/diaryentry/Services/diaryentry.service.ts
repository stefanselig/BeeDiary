import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DiaryEntryService {
	http: Http;
	diaryEntries: any;
	
	constructor(http:Http) {
		this.http = http;
	}
	
	public getDiaryEntries(): void {
		this.diaryEntries = this.http
		.get('http://localhost:8080/api/DiaryEntries/diaryEntries')
		.map
		(
			response => response.json()
		);
	}
	
	public getDiaryEntryById(id: string): any {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		console.log('http://localhost:8080/api/DiaryEntries/diaryEntries/' + id);
		
		return  this.http
		.get(
			'http://localhost:8080/api/DiaryEntries/diaryEntries/' + id,
			{
				headers: headers
			}
		)
		.map(
			response => response.json()
		);
	}
	
	public updateDiaryEntry(diaryEntry: any, callback: any): void {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		// Somehow pass ID
		this.http
		.post(
			'http://localhost:8080/api/DiaryEntries/diaryEntries/' + diaryEntry.id,
			JSON.stringify(diaryEntry),
			{
				headers: headers
			}
		).subscribe(
			res => {
				console.log(res.json());
				callback();
			}
		);
	}
	
	public createDiaryEntry(diaryEntry: any, callback: any): void {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		console.log(JSON.stringify(diaryEntry));
		
		this.http
		.post(
			'http://localhost:8080/api/DiaryEntries/diaryEntries',
			JSON.stringify(diaryEntry),
			{
				headers: headers
			}
		).subscribe(
			res => {
				console.log(res.json());
				callback();
			}
		);
	}
}