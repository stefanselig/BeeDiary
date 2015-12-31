import {Component} from 'angular2/core';

@Component({
	selector: 'DiaryEntry',
	templateUrl: 'app/diaryentry/Templates/diaryentry.template.html'
})
export class DiaryEntryComponent {
	public diaryEntries: Array<any>;

	constructor() {
		this.diaryEntries = [];
	}
}