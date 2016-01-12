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
	
	constructor(diaryEntryService: DiaryEntryService, router: Router, params: RouteParams) {
		this.diaryEntryService = diaryEntryService;
		this.router = router;
		
		this.diaryentry = {
			type: "AcarianControl",
			date: new Date(),
			Description: ""
		};
		//this.loadSelectedDiaryEntryFromWebService(params.get('id'));
	}
	
	public loadSelectedDiaryEntryFromWebService(id: number): void {
		this.diaryentry = this.diaryEntryService.getDiaryEntryById(id).subscribe(
			selectedDiaryEntry => this.diaryentry = selectedDiaryEntry,
			error => console.error("Error" + error),
			() => {
				console.log("Completed");
				console.log(this.diaryentry);
			}
		);
	}
	
	public updateDiaryEntry(): void {
		//this.diaryEntryService.updateDiaryEntry(this.diaryEntry);
		this.router.navigate(['DiaryEntry']);
	}
	
	public cancel(): void {
		this.router.navigate(['DiaryEntry']);
	}
}