import {Injectable}	from 'angular2/core';
import {Http, Headers}		from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable}	from 'rxjs/Observable';

@Injectable()
export class DiaryEntryService {
	public generalHeaders: Headers;
	public typeEnum: any[] = [];
	public treatmentTypes: any[] = [];
	public feedingTypes: any[] = [];
	
	constructor(public http:Http) {
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
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
	
	public createDiaryEntry(diaryEntry: any): Observable<string> {
		return this.http
		.post(
			'http://localhost:8080/api/DiaryEntries/diaryEntries',
			JSON.stringify(diaryEntry),
			{ headers: this.generalHeaders }
		).map(res => res.json());
	}
	
	public getEnum(enumType: string): Promise<any> {
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
	
	public loadEnums(): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const promise1 = this.getEnum('typeEnum');
			const promise2 = this.getEnum('foodEnum');
			const promise3 = this.getEnum('treatmentEnum');
			Promise.all([promise1, promise2, promise3])
					.then((values: any[]) => {
						this.typeEnum = values[0].slice();
						this.feedingTypes = values[1].slice();
						this.treatmentTypes = values[2].slice();
						resolve("Loading enums was successful.");
					}).catch((err) => reject(err));
		});
		
		
		
		/*return new Promise((resolve, reject) => {
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
		});*/
	}
}