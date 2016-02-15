import {Component, OnInit, AfterViewInit}	from 'angular2/core';
import {Router, RouteParams}				from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'displaydiaryentry',
	templateUrl: 'app/diaryentry/Templates/displayDiaryEntry.template.html',
	inputs: ['diaryentry'],
	providers: [DiaryEntryService]
})
export class DisplayDiaryEntryComponent implements OnInit, AfterViewInit {
	public diaryentry: any = {};
	
	public typeEnum: any[];
	public treatmentTypes: any[];
	public feedingTypes: any[];
	
	constructor(public diaryEntryService: DiaryEntryService, public router: Router) {
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
	
	ngAfterViewInit(): void {
		// Maybe without the comma?
		// data:image/jpeg;base64,
	}
	
	ngOnInit(): void {}
	
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