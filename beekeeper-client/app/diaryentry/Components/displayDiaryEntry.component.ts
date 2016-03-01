import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {DiaryEntryService} from '../services/diaryentry.service';
import {Utilities} from '../../utilities.service';

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
	public beehiveMap: any[];
	
	public viewDetails: boolean = false;
	
	constructor(public diaryEntryService: DiaryEntryService, public router: Router, public utils: Utilities) {
		this.getBeeHiveNamesAndIds();
	}
	
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
	
	public getBeeHiveNamesAndIds(): void {
		this.diaryEntryService
			.beehiveNamesAndIdsMap
			.subscribe(
				res => {
					console.log(res);
					this.beehiveMap = res.slice();
				},
				err => console.log(err)
			);
	}
	
	public getBeeHiveName(beeHiveId: string): string {
		if (this.beehiveMap != undefined) {
			const hive = this.beehiveMap.find(beehive => beehive._id == beeHiveId);
			return hive == undefined ? "" : hive.hiveName;
		}
		else
			return "";
	}
}