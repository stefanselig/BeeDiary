import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'DiaryEntry',
	templateUrl: 'app/diaryentry/Templates/diaryentry.template.html',
	providers: [DiaryEntryService]
})
export class DiaryEntryComponent implements OnInit {
	public diaryEntries: Array<any>;
	
	public diaryEntryService: DiaryEntryService;
	public router: Router;

	constructor(diaryEntryService: DiaryEntryService, router: Router) {
		this.diaryEntries = [];
		this.diaryEntryService = diaryEntryService;
		this.router = router;
	}
	
	private ngOnInit(): void {
		this.diaryEntryService.getDiaryEntries();
		
		var instance = this;
		
		this.diaryEntryService.diaryEntries.subscribe(
			diaryEntries => {
				console.log("diaryentries retrieved. length: " + diaryEntries.length);
				instance.diaryEntries = diaryEntries.slice();
				console.log(instance.diaryEntries);
			},
			error => console.error("Error" + error),
			() => console.log("Completed")
		);
	}
	
	public createDiaryEntry(): void {
		this.router.navigate(['CreateDiaryEntry']);
	}
	
	public editDiaryEntry(id: number): void {
		console.log(id);
		this.router.navigate(['EditDiaryEntry', { id: id }]);
	}
}