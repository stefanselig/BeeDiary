import {Component, OnInit}	from 'angular2/core';
import {Router}				from 'angular2/router';
import {RouteParams}	from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'diaryentry',
	templateUrl: 'app/diaryentry/Templates/diaryEntry.template.html',
	inputs: ['diaryentry', 'display'],
	providers: [DiaryEntryService]
})
export class DiaryEntryComponent implements OnInit {
	public diaryentry: any;
	public diaryEntryService: DiaryEntryService;
	public router: Router;
	public display: boolean;
	public typeEnum: any[];
	public treatmentTypes: any[];
	public feedingTypes: any[];
	
	constructor(diaryEntryService: DiaryEntryService, router: Router) {
		this.diaryEntryService = diaryEntryService;
		this.diaryentry = {};
		this.router = router;
		this.loadEnums();
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