import {Component, OnInit, AfterViewInit}	from 'angular2/core';
import {Router, RouteParams}				from 'angular2/router';

import {DiaryEntryService}	from '../services/diaryentry.service';

import * as DiaryEntryModule from './../../build-client/DiaryEntry/DiaryEntry';

@Component({
	selector: 'displaydiaryentry',
	templateUrl: 'app/diaryentry/Templates/displayDiaryEntry.template.html',
	inputs: ['diaryentry'],
	providers: [DiaryEntryService]
})
export class DisplayDiaryEntryComponent implements OnInit, AfterViewInit {
	public diaryentry: DiaryEntryModule.DiaryEntry = new DiaryEntryModule.DiaryEntry();
	
	constructor(public diaryEntryService: DiaryEntryService, public router: Router) {}
	
	ngAfterViewInit(): void {
		// Maybe without the comma?
		// data:image/jpeg;base64,
	}
	
	ngOnInit(): void {}
	
	public parseMd(): string {
		if (this.diaryentry.description == null) 
			return "";
		else 
			return marked(this.diaryentry.description);
	}
	
	public editDiaryEntry(id: number): void {
		this.router.navigate(['EditDiaryEntry', { id: id }]);
	}
}