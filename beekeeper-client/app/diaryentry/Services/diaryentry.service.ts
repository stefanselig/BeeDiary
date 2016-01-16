import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DiaryEntryService {
	http: Http;
	diaryEntries: any;
	generalHeaders: Headers;
	
	constructor(http:Http) {
		this.http = http;
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
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
		return this.http
		.get(
			'http://localhost:8080/api/DiaryEntries/diaryEntries/' + id,
			{
				headers: this.generalHeaders
			}
		)
		.map(
			response => response.json()
		);
	}
	
	public updateDiaryEntry(diaryEntry: any, callback: any): void {
		this.http
		.post(
			'http://localhost:8080/api/DiaryEntries/diaryEntries/' + diaryEntry.id,
			JSON.stringify(diaryEntry),
			{
				headers: this.generalHeaders
			}
		).subscribe(
			res => {
				console.log(res.json());
				callback();
			}
		);
	}
	
	public createDiaryEntry(diaryEntry: any, callback: any): void {
		this.http
		.post(
			'http://localhost:8080/api/DiaryEntries/diaryEntries',
			JSON.stringify(diaryEntry),
			{
				headers: this.generalHeaders
			}
		).subscribe(
			res => {
				console.log(res.json());
				callback();
			}
		);
	}
	
	public getEnum(enumType: string): any {
		return this.http
		.get(
			'http://localhost:8080/api/DiaryEntries/' + enumType,
			{
				headers: this.generalHeaders
			}
		)
		.map(
			response => response.json();
		);
	}
}