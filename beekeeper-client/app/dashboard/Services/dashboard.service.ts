import {Injectable}	from 'angular2/core';
import {Http}		from 'angular2/http';
import {Headers}	from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/Observable';

@Injectable()
export class DashBoardService {
	http: Http;
	generalHeaders: Headers;
	public typeEnum: any[];
	public treatmentTypes: any[];
	public feedingTypes: any[];
	
	constructor(http:Http) {
		this.http = http;
		
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
		
		this.typeEnum = [];
		this.treatmentTypes = [];
		this.feedingTypes = [];
	}
	
	public getData(): Observable {
		return this.http
		.get('http://localhost:8080/api/DashboardData')
		.map(res => res.json());
	}
	
	public getDiaryEntries(): Observable {
		return this.http
		.get('http://localhost:8080/api/DiaryEntries/diaryEntries')
		.map(res => res.json());
	}
	
	public getDiaryEntryById(id: string): Observable {
		return this.http
		.get('http://localhost:8080/api/DiaryEntries/diaryEntries/' + id,
			{ headers: this.generalHeaders})
		.map(res => res.json());
	}
	
	public updateDiaryEntry(diaryEntry: any): Observable {
		return this.http
		.put(
			'http://localhost:8080/api/DiaryEntries/diaryEntries/' + diaryEntry._id,
			JSON.stringify(diaryEntry),
			{ headers: this.generalHeaders })
		.map(res => res.json());
	}
	
	public createDiaryEntry(diaryEntry: any): Promise {
		return this.http
		.post(
			'http://localhost:8080/api/DiaryEntries/diaryEntries',
			JSON.stringify(diaryEntry),
			{ headers: this.generalHeaders }
		).map(res => res.json());
	}
	
	public getEnum(enumType: string): Promise {
		return new Promise((resolve, reject) => {
			this.http
			.get(
				'http://localhost:8080/api/DiaryEntries/' + enumType,
				{ headers: this.generalHeaders})
			.map(res => res.json())
			.subscribe(
				res => resolve(res),
				err => reject(err)
			)
		});
	}
	
	public loadEnums(): Promise {
		return new Promise((resolve, reject) => {
			this.getEnum('typeEnum')
			.then(
				res => { this.typeEnum = res.slice(); }
			)
			.then(
				() => this.getEnum('foodEnum')
			)
			.then(
				res => { this.feedingTypes = res.slice(); }
			)
			.then(
				() => this.getEnum('treatmentEnum')
			)
			.then(
				res => { this.treatmentTypes = res.slice(); }
			)
			.then( 
				() => resolve("Finished loading enums.")
			)
			.catch(
				err => reject(err)
			);
		});
	}
}