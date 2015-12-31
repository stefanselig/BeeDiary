import {Component} from 'angular2/core';
import {DiaryEntry} from './model';

@Component({
	selector: 'DiaryEntry',
	templateUrl: 'app/diaryentry/Templates/diaryentry.template.html'
})
export class DiaryEntryComponent {
	public diaryEntries: DiaryEntry[];

	constructor() {
		this.diaryEntries = [];
		var diaryEntry = new DiaryEntry();
		diaryEntry._date = new Date();
		diaryEntry._description = "First DiaryEntry";
		this.diaryEntries.push(diaryEntry);
	}
}