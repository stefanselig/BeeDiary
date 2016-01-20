import {Component} 		from 'angular2/core';
import {Router}			from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'CreateDiaryEntry',
	templateUrl: 'app/diaryentry/Templates/createDiaryEntry.template.html',
	providers: [DiaryEntryService]
})
export class CreateDiaryEntryComponent {
	public newDiaryEntry: any;
	public mdDescription: string;
	
	public typeEnum: any[];
	public treatmentTypes: any[];
	public feedingTypes: any[];
		
	public diaryEntryService: DiaryEntryService;
	public router: Router;
	
	constructor(diaryEntryService: DiaryEntryService, router: Router) {
		this.diaryEntryService = diaryEntryService;
		this.router = router;
		
		this.typeEnum = [];
		this.treatmentTypes = [];
		this.feedingTypes = [];
		this.mdDescription = "";
		
		this.loadEnums();
	}
	
	public createNewDiaryEntry(createDiaryEntryForm: any): void {
		this.newDiaryEntry = createDiaryEntryForm.value;
		
		this.diaryEntryService
		.createDiaryEntry(this.newDiaryEntry)
		.subscribe(
			res => {
				console.log(res);
				this.router.navigate(['DiaryEntry']);	
			},
			err => console.log(err),
			()  => console.log("Created diary entry.")
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
		this.router.navigate('DiaryEntry');
	}
	
	public parseMd(): any {
		if (this.mdDescription == null) 
			return "";
		else 
			return marked(this.mdDescription);
	}
}