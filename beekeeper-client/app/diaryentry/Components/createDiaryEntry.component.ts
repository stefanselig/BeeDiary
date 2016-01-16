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
	
	public typeEnum: any[];
	public diaryEntryService: DiaryEntryService;
	public router: Router;
	
	constructor(diaryEntryService: DiaryEntryService, router: Router) {
		this.diaryEntryService = diaryEntryService;
		this.router = router;
		
		this.typeEnum = [];
		this.typeEnum.push("acarianControl");
		this.typeEnum.push("construction");
		this.typeEnum.push("cutDroneBrood");
		this.typeEnum.push("other");
		this.typeEnum.push("feeding");
		this.typeEnum.push("honeyRemoval");
		this.typeEnum.push("loss");
		this.typeEnum.push("treatment");
	}
	
	public createNewDiaryEntry(createDiaryEntryForm: any): void {
		this.newDiaryEntry = createDiaryEntryForm.value;
		
		console.log(this.newDiaryEntry);
		console.log(createDiaryEntryForm.value);
		
		this.diaryEntryService.createDiaryEntry(this.newDiaryEntry, this.createDiaryEntryCallback('DiaryEntry'));
	}
	
	public createDiaryEntryCallback(viewName: string): (viewName: string) => void {
		var instance = this;
		return viewname => instance.router.navigate([viewName]);
	}
	
	public navigateToOtherView(viewName: string): void {
		this.router.navigate([viewName]);
	}
	
	public cancel(): void {
		this.navigateToOtherView('DiaryEntry');
	}
}