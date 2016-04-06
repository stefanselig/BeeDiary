import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {DiaryEntryService} from '../../../services/diaryentry.service';
import {Utilities} from '../../../services/utilities.service';

import * as DiaryEntryModule from '../../../model/model/DiaryEntry/DiaryEntry';

@Component({
	selector: 'displaydiaryentry',
	templateUrl: 'app/components/diaryentry/displaydiaryentry/displayDiaryEntry.template.html',
	inputs: ['diaryentry'],
	outputs: ['onDiaryEntryDeleted']
})
export class DisplayDiaryEntryComponent  {
	public diaryentry: DiaryEntryModule.DiaryEntry = new DiaryEntryModule.DiaryEntry();
	public onDiaryEntryDeleted: EventEmitter<string> = new EventEmitter<string>();
	public beehiveMap: any[];
	
	public viewDetails: boolean = false;
	/** Loads BeeHiveNamesAndIds */
	constructor(public diaryEntryService: DiaryEntryService, public router: Router, public utils: Utilities) {
		this.getBeeHiveNamesAndIds();
	}
	/** Shows the DiaryEntries details */
	public showDetails(): void {
		this.viewDetails = !this.viewDetails;
	}
	/** Parses markdown text to HTML */
	public parseMd(): string {
		return this.diaryentry.description == null ? "" : marked(this.diaryentry.description);
	}
	/** Navigates to EditDiaryEntryView with the selected BeeHive's id as parameter */
	public editDiaryEntry(id: number): void {
		this.router.navigate(['EditDiaryEntry', { id: id }]);
	}
	/** Removes DiaryEntry by id */
	public removeDiaryEntry(id: string): void {
		this.onDiaryEntryDeleted.emit(id);
	}
	/** Loads BeeHiveNamesAndIdsMap from Service */
	public getBeeHiveNamesAndIds(): void {
		this.diaryEntryService
			.beehiveNamesAndIdsMap
			.subscribe(
				res => {
					this.beehiveMap = res.slice();
				},
				err => console.log(err)
			);
	}
	/** Gets the BeeHive's name depending on id value */
	public getBeeHiveName(beeHiveId: string): string {
		if (this.beehiveMap != undefined) {
			const hive = this.beehiveMap.find(beehive => beehive._id == beeHiveId);
			return hive == undefined ? "" : hive.hiveName;
		}
		else
			return "";
	}
	/** Returns either "Gut" or "Schlecht" depending on mood value */
	public convertMoodValue(mood: boolean): string {
		return mood == true ? "Gut" : "Schlecht";
	}
}