import {Component, OnInit, OnChanges, EventEmitter}	from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'diaryentry',
	templateUrl: 'app/diaryentry/Templates/diaryEntry.template.html',
	inputs: ['diaryentry'],
	outputs: ['OnDiaryEntryChanged'],
	styles: [`
		.ng-valid[required] {
			border-left: 5px solid #42A948; /* green */
		}

		.ng-invalid {
			border-left: 5px solid #a94442; /* red */
		}
	`],
	providers: [DiaryEntryService]
})
export class DiaryEntryComponent implements OnInit, OnChanges {
	public diaryentry: any = {};
	public OnDiaryEntryChanged: EventEmitter<any> = new EventEmitter<any>();
	
	public typeEnum: any[];
	public treatmentTypes: any[];
	public feedingTypes: any[];
	
	constructor(public diaryEntryService: DiaryEntryService, public router: Router) {
		this.loadEnums();
		this.diaryentry.description = "";
		this.diaryentry.isMarkdownEnabled = false;
		this.diaryentry.typeEnum = "";
		this.diaryentry.countDays = 0;
		this.diaryentry.deadAcarians = 0;
		this.diaryentry.treatmentType = "";
		this.diaryentry.appliance = "";
		this.diaryentry.treatmentBegin = new Date();
		this.diaryentry.treatmentEnd = new Date();
		this.diaryentry.feedingType = "";
		this.diaryentry.amount = 0;
		this.diaryentry.proportion = "";
		this.diaryentry.reason = "";
		this.diaryentry.otherText = "";
		this.diaryentry.date = new Date();
		this.diaryentry.photos = [];
	}
	
	ngOnInit(): void {}
	
	ngOnChanges(changes) {
		//console.log(changes);
		//this.OnDiaryEntryChanged.emit(changes);
	}
	
	public loadEnums(): void {
		this.diaryEntryService
			.loadEnums()
			.then(
				res => {
					this.typeEnum = this.diaryEntryService.typeEnum.slice();
					this.feedingTypes = this.diaryEntryService.feedingTypes.slice();
					this.treatmentTypes = this.diaryEntryService.treatmentTypes.slice();
				}
			)
			.catch(
				err => console.log(err)
			);
	}
	
	public parseMd(): any {
		if (this.diaryentry.description == null) 
			return "";
		else 
			return marked(this.diaryentry.description);
	}
	
	public editDiaryEntry(id: number): void {
		this.router.navigate(['EditDiaryEntry', { id: id }]);
	}
}