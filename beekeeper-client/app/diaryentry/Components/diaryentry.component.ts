import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'DiaryEntry',
	templateUrl: 'app/diaryentry/Templates/diaryentry.template.html',
	providers: [DiaryEntryService]
})
export class DiaryEntryComponent {
	public diaryEntries: Array<any>;
	
	public diaryEntryService: DiaryEntryService;
	public router: Router;

	constructor(diaryEntryService: DiaryEntryService, router: Router) {
		this.diaryEntries = [];
		this.diaryEntryService = diaryEntryService;
		this.router = router;
		
		
		this.diaryEntries.push({
			type: "AcarianControl",
			date: new Date(),
			Description: ""
		});
		//this.diaryEntries = this.diaryEntryService.diaryEntries.slice();
	}
	
	public createDiaryEntry(): void {
		this.router.navigate(['CreateDiaryEntry']);
	}
	
	public editDiaryEntry(id: number): void {
		this.router.navigate(['EditDiaryEntry'], { id: id });
	}
}