import {Component} from 'angular2/core';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'DiaryEntry',
	templateUrl: 'app/diaryentry/Templates/diaryentry.template.html',
	providers: [DiaryEntryService]
})
export class DiaryEntryComponent {
	public diaryEntries: Array<any>;
	public diaryEntryService: DiaryEntryService;

	constructor(diaryEntryService: DiaryEntryService) {
		this.diaryEntries = [];
		this.diaryEntryService = diaryEntryService;
		this.diaryEntries = this.diaryEntryService.diaryEntries.slice();
	}
}