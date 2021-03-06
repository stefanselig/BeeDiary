import {Component} from 'angular2/core';
import {Router}	from 'angular2/router';

import {DiaryEntryService}	from '../../../services/diaryentry.service';
import {Utilities} from '../../../services/utilities.service';

import {DiaryEntryComponent} from '../diaryentry/diaryentry.component';

import {DiaryEntry} from '../../../model/model/DiaryEntry/DiaryEntry';

@Component({
	selector: 'creatediaryentry',
	template: `
		<form (ngSubmit)="createDiaryEntry()" #creatediaryentryform="ngForm">
			<diaryentry [diaryentry]="diaryentry"></diaryentry>
			<button type="submit" class="btn btn-default" [disabled]="!creatediaryentryform.valid">
				<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
			</button>
			<button (click)="cancel()" class="btn btn-default">
				<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
			</button>
		</form>
	`,
	directives: [DiaryEntryComponent]
})
export class CreateDiaryEntryComponent {
	public diaryentry: DiaryEntry = new DiaryEntry();
	
	constructor(public diaryEntryService: DiaryEntryService, public router: Router, public utils: Utilities) {
		this.diaryentry.photos = [];
	}
	
	/**
	 * Submits a diary entry via diary entry service.
	 * Returns back to diary entry main view on success.
	 */
	public createDiaryEntry(): void {
		this.diaryEntryService
			.createElement(JSON.stringify(this.diaryentry))
			.subscribe(
				res => {
					console.log(res);
					this.router.navigate(['DiaryEntries']);
				},
				err => this.utils.errCallback(err)
			);
	}
	
	/** 
	 * Cancels current operation and
	 * returns back to diary entry main view
	 */
	public cancel(): boolean {
		this.router.navigate(['DiaryEntries']);
		return false;
	}
}