import {Component} from 'angular2/core';
import {Router}	from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';
import {DiaryEntryComponent} from './diaryentry.component';
import {DiaryEntry} from './../../build-client/DiaryEntry/DiaryEntry';

@Component({
	selector: 'creatediaryentry',
	template: `
		<form (ngSubmit)="createDiaryEntry()" #diaryEntryForm="ngForm">
			<diaryentry [diaryentry]="diaryentry"></diaryentry>
			<button type="submit" class="btn btn-default" [disabled]="!diaryEntryForm.form.valid">
				<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
			</button>
			<button (click)="cancel()" class="btn btn-default">
				<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
			</button>
		</form>
	`,
	directives: [DiaryEntryComponent]
})
export class CreateDiaryEntryComponent {
	public diaryentry: DiaryEntry = new DiaryEntry();
	
	constructor(public diaryEntryService: DiaryEntryService, public router: Router) {
		this.diaryentry.photos = [];
	}
	
	/**
	 * Submits a diary entry via diary entry service.
	 * Returns back to diary entry main view on success.
	 */
	public createDiaryEntry(): void {
		this.diaryEntryService
			.createDiaryEntry(this.diaryentry)
			.subscribe(
				res => {
					console.log(res);
					this.router.navigate(['DiaryEntries']);
				},
				err => console.log(err)
			);
	}
	
	/** 
	 * Cancels current operation and
	 * returns back to diary entry main view
	 */
	public cancel(): void {
		this.router.navigate(['DiaryEntries']);
	}
}