import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {DiaryEntryComponent} from './diaryentry.component';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'DiaryEntries',
	directives: [DiaryEntryComponent],
	templateUrl: 'app/diaryentry/Templates/diaryentries.template.html',
	providers: [DiaryEntryService]
})
export class DiaryEntriesComponent implements OnInit {
	public diaryEntries: any[];
	public display: boolean = true;
	
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
	
	public createDiaryEntry(): void {
		this.router.navigate(['CreateDiaryEntry']);
	}
}