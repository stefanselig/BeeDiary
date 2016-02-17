import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {DiaryEntryService} from '../services/diaryentry.service';

import * as DiaryEntryModule from './../../build-client/DiaryEntry/DiaryEntry';

@Component({
	selector: 'displaydiaryentry',
	templateUrl: 'app/diaryentry/Templates/displayDiaryEntry.template.html',
	inputs: ['diaryentry'],
	outputs: ['onDiaryEntryDeleted']
})
export class DisplayDiaryEntryComponent  {
	public diaryentry: DiaryEntryModule.DiaryEntry = new DiaryEntryModule.DiaryEntry();
	public onDiaryEntryDeleted: EventEmitter<string> = new EventEmitter<string>();
	
	public viewDetails: boolean = false;
	
	constructor(public diaryEntryService: DiaryEntryService, public router: Router) {}
	
	public showDetails(): void {
		this.viewDetails = !this.viewDetails;
	}
	
	public parseMd(): string {
		if (this.diaryentry.description == null) 
			return "";
		else 
			return marked(this.diaryentry.description);
	}
	
	public editDiaryEntry(id: number): void {
		this.router.navigate(['EditDiaryEntry', { id: id }]);
	}
	
	public removeDiaryEntry(id: string): void {
		this.onDiaryEntryDeleted.emit(id);
	}
	
	public formatDate(date: Date, options): string {
		if (date == null || date == undefined)
			return "";
		const months = ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
		let month;
		if (options == "fullmonths") {
			month = months[date.getMonth()];
		}
		else {
			month = date.getMonth()+1;
		}
		return `${date.getDate()}. ${month}. ${date.getFullYear()}`;
	}
}