import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {DiaryEntryComponent} from './diaryentry.component';
import {DiaryEntryService}	from '../services/diaryentry.service';

import {DiaryEntry} from './../../build-client/DiaryEntry/DiaryEntry';

@Component({
	selector: 'EditDiaryEntry',
	directives: [DiaryEntryComponent],
	template: `
		<form (ngSubmit)="updateDiaryEntry()" #updatediaryentryform="ngForm">
			<div class="form-group">
				<diaryentry [diaryentry]="diaryentry"></diaryentry>
				<button type="submit" class="btn btn-default" [disabled]="!updatediaryentryform.valid">
					<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
				</button>
				<button (click)="deleteDiaryEntry()" class="btn btn-default">
					<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
				</button>
				<button (click)="cancel()" class="btn btn-default">
					<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
				</button>
			</div>
		</form>
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
	
	public deleteDiaryEntry(): void {
		this.diaryEntryService
			.deleteDiaryEntryById(this.diaryentry._id)
			.subscribe(
				res => console.log(res),
				err => console.log(err),
				()  => this.router.navigate(['DiaryEntries'])
			);
	}
	
	public cancel(): void {
		this.router.navigate(['DiaryEntries']);
	}
}