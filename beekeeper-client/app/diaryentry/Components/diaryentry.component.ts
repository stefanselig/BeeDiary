import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'DiaryEntry',
	templateUrl: 'app/diaryentry/Templates/diaryentry.template.html',
	providers: [DiaryEntryService]
})
export class DiaryEntryComponent implements OnInit {
	public diaryEntries: any[];
	
	public diaryEntryService: DiaryEntryService;
	public router: Router;

	constructor(diaryEntryService: DiaryEntryService, router: Router) {
		this.diaryEntryService = diaryEntryService;
		this.router = router;
		
		this.diaryEntries = [];
	}
	
	private ngOnInit(): void {
		this.loadDiaryEntries();
	}
	
	public loadDiaryEntries(): void {
		this.diaryEntryService
		.getDiaryEntries()
		.subscribe(
			res => {
				this.diaryEntries = res.slice();
				console.log("Length of retrieved DiaryEntries: " + res.length);
			},
			err => console.error(err),
			()  => console.log("Load completed.")
		);
	}
	
	public parseMd(id: number): any {
		if (this.diaryEntries[id].description == null)
			return "";
		else
			return marked(this.diaryEntries[id].description);
	}
	
	public createDiaryEntry(): void {
		this.router.navigate(['CreateDiaryEntry']);
	}
	
	public editDiaryEntry(id: number): void {
		this.router.navigate(['EditDiaryEntry', { id: id }]);
	}
}