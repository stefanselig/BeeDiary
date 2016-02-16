import {Component}	from 'angular2/core';
import {DiaryEntryService} from '../services/diaryentry.service';
import {
	DiaryEntry, 
	entryTypeEnum,
	treatmentTypeEnum,
	foodTypeEnum
} from './../../build-client/DiaryEntry/DiaryEntry';

@Component({
	selector: 'diaryentry',
	templateUrl: 'app/diaryentry/Templates/diaryEntry.template.html',
	inputs: ['diaryentry'],
	styles: [`
		.ng-valid[required] {
			border-left: 5px solid #42A948; /* green */
		}

		.ng-invalid {
			border-left: 5px solid #a94442; /* red */
		}
	`]
})
export class DiaryEntryComponent {
	public diaryentry: DiaryEntry;
	
	public typeEnum: entryTypeEnum[];
	public treatmentTypes: treatmentTypeEnum[];
	public feedingTypes: foodTypeEnum[];
	
	constructor(public diaryEntryService: DiaryEntryService) {
		this.loadEnums();
	}
	
	public loadEnums(): void {
		this.diaryEntryService.typeEnum.subscribe(
			(res: entryTypeEnum[]) => this.typeEnum = res.slice(),
			err => console.log(err)
		);
		this.diaryEntryService.treatmentTypes.subscribe(
			(res: treatmentTypeEnum[]) => this.treatmentTypes = res.slice(),
			err => console.log(err)
		);
		this.diaryEntryService.feedingTypes.subscribe(
			(res: foodTypeEnum[]) => this.feedingTypes = res.slice(),
			err => console.log(err)
		);
	}
	
	public parseMd(): string {
		if (this.diaryentry.description == null) 
			return "";
		else 
			return marked(this.diaryentry.description);
	}
}