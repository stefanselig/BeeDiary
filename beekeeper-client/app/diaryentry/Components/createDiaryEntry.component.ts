import {Component} 		from 'angular2/core';
import {Router}			from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'CreateDiaryEntry',
	templateUrl: 'app/diaryentry/Templates/createDiaryEntry.template.html',
	providers: [DiaryEntryService]
})
export class CreateDiaryEntryComponent {
	public diaryEntryService: DiaryEntryService;
	public router: Router;
	
	constructor(diaryEntryService: DiaryEntryService, router: Router) {
		this.diaryEntryService = diaryEntryService;
		this.router = router;
	}
	
	public createNewDiaryEntry(createDiaryEntryForm: any): void {
		//this.diaryEntryService.createDiaryEntry(this.newDiaryEntry);
		
		console.log(createDiaryEntryForm.value);
		this.router.navigate(['DiaryEntry']);
	}
	
	public cancel(): void {
		this.router.navigate(['DiaryEntry']);
	}
}