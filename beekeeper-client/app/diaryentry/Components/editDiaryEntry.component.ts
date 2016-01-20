import {Component} 		from 'angular2/core';
import {Router}			from 'angular2/router';
import {RouteParams}	from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'EditDiaryEntry',
	templateUrl: 'app/diaryentry/Templates/editDiaryEntry.template.html',
	providers: [DiaryEntryService]
})
export class EditDiaryEntryComponent {
	public diaryentry: any;
	public diaryEntryService: DiaryEntryService;
	public router: Router;
	
	public typeEnum: any[];
	public treatmentTypes: any[];
	public feedingTypes: any[];
	
	constructor(diaryEntryService: DiaryEntryService, router: Router, params: RouteParams) {
		this.diaryEntryService = diaryEntryService;
		this.router = router;
		
		this.diaryentry = {};
		
		this.typeEnum = [];
		this.treatmentTypes = [];
		this.feedingTypes = [];
		
		this.loadEnums();
		this.loadSelectedDiaryEntry(params.get('id'));
	}
	
	public loadSelectedDiaryEntry(id: string): void {
		this.diaryEntryService
		.getDiaryEntryById(id)
		.subscribe(
			res => this.diaryentry = res,
			err => console.log(err),
			()  => console.log("Load completed.") 
		);
	}
	
	public updateDiaryEntry(): void {
		this.diaryEntryService
		.updateDiaryEntry(this.diaryentry)
		.subscribe(
			res => console.log(res), 
			err => console.log(err), 
			()  => {
				console.log("Update completed.");
				this.router.navigate(['DiaryEntry']);
			}
		);
	}
	
	public loadEnums(): void {
		this.diaryEntryService
		.getEnum('typeEnum')
		.subscribe(
			res => this.typeEnum = res.slice(),
			err => console.log(err),
			()  => console.log("TypeEnum loaded.") 
		);
		
		this.diaryEntryService
		.getEnum('foodEnum')
		.subscribe(
			res => this.feedingTypes = res.slice(),
			err => console.log(err),
			()  => console.log("FoodEnum loaded.")
		);
		
		this.diaryEntryService
		.getEnum('treatmentEnum')
		.subscribe(
			res => this.treatmentTypes = res.slice(),
			err => console.log(err),
			()  => console.log("TreatmentEnum loaded.")
		);
	}
	
	public cancel(): void {
		this.router.navigate(['DiaryEntry']);
	}
	
	public parseMd(): any {
		if (this.diaryentry.description == null) 
			return "";
		else 
			return marked(this.diaryentry.description);
	}
}