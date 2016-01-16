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
		
		this.loadSelectedDiaryEntryFromWebService(params.get('id'));
		this.loadEnums();
	}
	
	public loadSelectedDiaryEntryFromWebService(id: string): void {
		var instance = this;
		var observableObject = this.diaryEntryService.getDiaryEntryById(id);
		observableObject.subscribe(
			diaryEntry => {
				instance.diaryentry = diaryEntry;
				console.log(this.diaryentry);
			},
			error => console.log("Error " + error),
			() => console.log("Loaded single diaryEntry")
		);
	}
	
	public updateDiaryEntry(): void {
		this.diaryEntryService.updateDiaryEntry(this.diaryentry, this.updateDiaryEntryCallback('DiaryEntry'));
	}
	
	public updateDiaryEntryCallback(viewName: string): (viewName: string) => void {
		var instance = this;
		return viewname => instance.router.navigate([viewName]);
	}
	
	public loadEnums(): void {
		var instance = this;
		var observableObject: any[] = [];
		
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
}