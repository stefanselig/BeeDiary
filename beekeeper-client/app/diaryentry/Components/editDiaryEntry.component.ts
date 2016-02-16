import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {DiaryEntryComponent} from './diaryentry.component';
import {DiaryEntryService}	from '../services/diaryentry.service';

import {DiaryEntry} from './../../build-client/DiaryEntry/DiaryEntry';

@Component({
	selector: 'EditDiaryEntry',
	directives: [DiaryEntryComponent],
	template: `
		<div>
			<div class="form-group">
				<diaryentry [diaryentry]="diaryentry"></diaryentry>
				<button type="submit" (click)="updateDiaryEntry()" class="btn btn-default">
					<span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
				</button>
				<button (click)="cancel()" class="btn btn-default">
					<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
				</button>
			</div>
		</div>
	`,
	providers: [DiaryEntryService]
})
export class EditDiaryEntryComponent {
	public diaryentry: DiaryEntry = new DiaryEntry();
	
	constructor(public diaryEntryService: DiaryEntryService, public router: Router, params: RouteParams) {
		this.loadSelectedDiaryEntry(params.get('id'));
	}
	
	public loadSelectedDiaryEntry(id: string): void {
		this.diaryEntryService
		.getDiaryEntryById(id)
		.subscribe(
			(res: DiaryEntry) => {this.diaryentry = res;console.log(this.diaryentry);},
			err => console.log(err),
			()  => console.log("Load completed.") 
		);
	}
	
	public updateDiaryEntry(): void {
		this.diaryEntryService
		.updateDiaryEntry(this.diaryentry)
		.subscribe(
			res => console.log(res), 
			err => console.log(err), 
			()  => {
				console.log("Update completed.");
				this.router.navigate(['DiaryEntries']);
			}
		);
	}
	
	public cancel(): void {
		this.router.navigate(['DiaryEntries']);
	}
}