import {Component, OnInit, AfterViewInit, OnDestroy} from 'angular2/core';
import {Router} from 'angular2/router';
import {DiaryEntryComponent} from './diaryentry.component';
import {ViewDiaryEntryComponent} from './viewdiaryentry.component';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'DiaryEntries',
	directives: [ViewDiaryEntryComponent],
	templateUrl: 'app/diaryentry/Templates/diaryentries.template.html',
	providers: [DiaryEntryService]
})
export class DiaryEntriesComponent implements OnInit, AfterViewInit, OnDestroy {
	public allDiaryEntries: any[] = [];
	public diaryEntries: any[] = [];
	public display: boolean = true;
	public elementsStrings: string[] = [];
	
	public diaryEntryService: DiaryEntryService;
	public router: Router;

	constructor(diaryEntryService: DiaryEntryService, router: Router) {
		this.diaryEntryService = diaryEntryService;
		this.router = router;
	}
	
	private ngOnInit(): void {
		this.loadDiaryEntries();
	}
	
	private ngAfterViewInit(): void {
		this.initCalendar();
	}
	
	private ngOnDestroy(): void {
		this.allDiaryEntries = [];
		this.diaryEntries = [];
		$('#calendar').remove();
		console.log("Cleared data.");
	}
	
	public loadDiaryEntries(): void {
		this.diaryEntryService
		.getDiaryEntries()
		.subscribe(
			res => {
				this.allDiaryEntries = res.slice();
				console.log("Length of retrieved DiaryEntries: " + res.length);
				this.getStringsForSearch();
			},
			err => console.error(err),
			()  => console.log("Load completed.")
		);
	}
	
	public getStringsForSearch(): void {
		this.allDiaryEntries.map(e => this.elementsStrings.push(JSON.stringify(e)));
	}
	
	public loadDiaryEntriesForDate(selectedDate: string, d, ad): void {
		/*this.diaryEntries = [];
		this.allDiaryEntries
		.filter(e => (new Date(e.date)).toDateString() == (new Date(selectedDate).toDateString()))
		.map(el => this.diaryEntries.push(el));
		console.log(this.diaryEntries);*/
		d = [];
		ad.filter(e => (new Date(e.date)).toDateString() == (new Date(selectedDate).toDateString()))
		.map(el => d.push(el));
		console.log(d);
	}
	
	public createDiaryEntry(): void {
		this.router.navigate(['CreateDiaryEntry']);
	}
	
	public initCalendar(): void {
		var that = this;
		$('<div id="calendar" class="col-sm-4"></div>').insertBefore('#diaryEntryContainer');
		$('#calendar').datepicker({
			inline: true,
			firstDay: 1,
			showOtherMonths: true,
			dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			onSelect: function (date: string) {
				console.log("executed jquery callback");
				//that.loadDiaryEntriesForDate(date, that.diaryEntries, that.allDiaryEntries);
				that.diaryEntries = [];
				that.allDiaryEntries
				.filter(e => (new Date(e.date)).toDateString() == (new Date(date).toDateString()))
				.map(el => that.diaryEntries.push(el));
				console.log(that.diaryEntries);
			},
			nextText: "&rarr;",
			prevText: "&larr;"
		});
	}
	
	public search(formContent: any): void {
		var query: string = formContent.value.query;
		this.diaryEntries.length = 0;
		if (query == undefined)
			this.diaryEntries = this.allDiaryEntries.slice();
		else {
			this.elementsStrings
			.filter(e => e.toUpperCase().indexOf(query.toUpperCase()) != -1)
			.forEach(e => this.allDiaryEntries
				.filter(x => x._id == JSON.parse(e)._id)
				.map(y => this.diaryEntries.push(y)));
		}
	}
}