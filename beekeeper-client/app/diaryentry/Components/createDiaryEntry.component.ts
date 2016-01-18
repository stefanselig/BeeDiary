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
		
		console.log(this.newDiaryEntry);
		console.log(createDiaryEntryForm.value);
		
		this.diaryEntryService
		.createDiaryEntry(this.newDiaryEntry)
		.then(
			viewName =>	this.router.navigate([viewName])
		)
		.catch(
			error => console.log(error)
		);
	}
	
	public createDiaryEntryCallback(viewName: string): (viewName: string) => void {
		var instance = this;
		return viewname => instance.router.navigate([viewName]);
	}
	
	public loadEnums(): void {
		var instance = this;
		var observableObject: any[] = [];
		
		
		// Rewrite to use Promises
		
		observableObject.push(this.diaryEntryService.getEnum('typeEnum'));
		observableObject.push(this.diaryEntryService.getEnum('foodEnum'));
		observableObject.push(this.diaryEntryService.getEnum('treatmentEnum'));
		
		observableObject[0].subscribe(
			enumObj => {
				instance.typeEnum = enumObj.slice();
			},
			error => console.log("Error " + error),
			() => console.log("Loaded enum")
		);
		observableObject[1].subscribe(
			enumObj => {
				instance.feedingTypes = enumObj.slice();
			},
			error => console.log("Error " + error),
			() => console.log("Loaded enum")
		);
		observableObject[2].subscribe(
			enumObj => {
				instance.treatmentTypes = enumObj.slice();
			},
			error => console.log("Error " + error),
			() => console.log("Loaded enum")
		);
	}
	
	public navigateToOtherView(viewName: string): void {
		this.router.navigate([viewName]);
	}
	
	public cancel(): void {
		this.navigateToOtherView('DiaryEntry');
	}
	
	public parseMd(): void {
		document.getElementById('mdDescription').innerHTML = marked(this.mdDescription);
	}
}