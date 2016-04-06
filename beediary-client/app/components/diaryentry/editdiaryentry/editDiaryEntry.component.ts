import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {DiaryEntryComponent} from '../diaryentry/diaryentry.component';
import {DiaryEntryService}	from '../../../services/diaryentry.service';
import {Utilities} from '../../../services/utilities.service';

import {DiaryEntry} from '../../../model/model/DiaryEntry/DiaryEntry';

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
	/** Loads selected DiaryEntry */
	constructor(public diaryEntryService: DiaryEntryService, public router: Router, params: RouteParams, public utils: Utilities) {
		this.loadSelectedDiaryEntry(params.get('id'));
	}
	/** Loads the DiaryEntry with the passed id from the service */
	public loadSelectedDiaryEntry(id: string): void {
		this.diaryEntryService
		.getElementById(id)
		.subscribe(
			(res: DiaryEntry) => {this.diaryentry = res;console.log(this.diaryentry);},
			err => this.utils.errCallback(err),
			()  => console.log("Load completed.") 
		);
	}
	/** Updates selected DiaryEntry */
	public updateDiaryEntry(): void {
		this.diaryEntryService
		.updateElement(JSON.stringify(this.diaryentry), this.diaryentry._id)
		.subscribe(
			res => console.log(res), 
			err => console.log(err), 
			()  => {
				console.log("Update completed.");
				this.router.navigate(['DiaryEntries']);
			}
		);
	}
	/** Deletes selected DiaryEntry */
	public deleteDiaryEntry(): void {
		this.diaryEntryService
			.deleteElementById(this.diaryentry._id)
			.subscribe(
				res => console.log(res),
				err => console.log(err),
				()  => this.router.navigate(['DiaryEntries'])
			);
	}
	/** Cancels current action and returns back to DiaryEntriesMainView */
	public cancel(): boolean {
		this.router.navigate(['DiaryEntries']);
		return false;
	}
}