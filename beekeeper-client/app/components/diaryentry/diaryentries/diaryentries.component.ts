import {Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {DiaryEntryService}	from '../../../services/diaryentry.service';
import {SearchService} from '../../../services/search.service';
import {Utilities} from '../../../services/utilities.service';

import {DisplayDiaryEntryComponent} from '../displaydiaryentry/displaydiaryentry.component';
import {SearchComponent}	from '../../search/search.component';

import {DiaryEntry} from '../../../model/model/DiaryEntry/DiaryEntry';

// Overally refactor code
@Component({
	selector: 'DiaryEntries',
	directives: [DisplayDiaryEntryComponent, SearchComponent],
	template: `
		<h1>Deine Tagebucheinträge: </h1>
		<div class="row">
			<div class="form-group form-inline">
				<search [name]="'Tagebucheinträge'" (onSearch)="search($event)"></search>
				<button (click)="createDiaryEntry()" class="btn btn-default form-control">
					<span class="glyphicon glyphicon-file" aria-hidden="true"></span>
				</button>
				<button (click)="toggleSearchResults()" *ngIf="showSearchResults" class="btn btn-default form-control">Zurück zu den gruppierten Einträgen</button>
			</div>
			<div *ngFor="#date of entryDates" [id]="date" class="col-sm-12 col-xs-12">
				<h1 *ngIf="diaryEntriesPerDate[date.toDateString()].length > 0">
					{{diaryEntriesPerDate[date.toDateString()].length == 0 ? "" : utils.formatDate(date, "fullmonths")}}
				</h1>
				<div *ngIf="diaryEntriesPerDate[date.toDateString()].length > 0" class="row">
					<displaydiaryentry *ngFor="#diaryentry of diaryEntriesPerDate[date.toDateString()]" (onDiaryEntryDeleted)="deleteDiaryEntry($event)" [diaryentry]="diaryentry" class="col-sm-4 col-xs-12"></displaydiaryentry>
				</div>
			</div>
		</div>
	`,
	providers: [SearchService]
})
export class DiaryEntriesComponent implements OnInit {
	//public allDiaryEntries: DiaryEntry[] = [];
	//public searchStrings: string[] = [];
	public diaryEntries: DiaryEntry[] = [];
	public entryDates: Date[] = [];
	public diaryEntriesPerDate: any[][] = [];
	public showSearchResults: boolean = false;

	constructor(public diaryEntryService: DiaryEntryService, public router: Router, public utils: Utilities, public params: RouteParams, public searchService: SearchService<DiaryEntry>) {}
	
	ngOnInit(): void {
		this.searchService.initSearch(this.diaryEntryService);
		this.loadDiaryEntries();
	}
	
	/**
	 * Event callback for create diary entry button click.
	 * Navigates to the create diary entry view.
	 */
	public createDiaryEntry(): void {
		this.router.navigate(['CreateDiaryEntry']);
	}
	
	/**
	 * Fills an array with diaryEntry dates (without duplicates).
	 */
	public getDates(): void {
		// Gets all all dates as a date string
		const dateStrings = this.diaryEntries
					.map(e => e.date)
					.filter(e => e != null)
					.map(e => e.toDateString());
		// Copies all unique dates into entryDates array	
		this.entryDates = dateStrings
							.filter((e, i) => dateStrings.indexOf(e) == i)
							.map(e => new Date(e))
							.sort((a: Date, b: Date) => a < b ? 1 : -1);
	}
	
	/**
	 * Loads diary entries from the service.
	 */
	public loadDiaryEntries(): void {
		this.diaryEntryService
		.elements
		.subscribe(
			(res: DiaryEntry[]) => this.initDiaryEntries(res),
			err => console.error(err),
			()  => console.log("Load completed.")
		);
	}
	
	/*public search(eventArgs: string) {
		this.diaryEntriesPerDate.length = 0;
		this.sear
	}*/
	
	/**
	 * Initializes all necessary data
	 */
	public initDiaryEntries(res: DiaryEntry[]): void {
		//this.allDiaryEntries = res.slice();
		//console.log(this.allDiaryEntries);
		//this.getStringsForSearch();
		this.diaryEntries = res.slice();
		this.convertDatesOfDiaryEntries();
		this.getDates();
		if (this.params.get('id') == undefined) {
			this.getDiaryEntriesForDates();
		} else {
			const collection = this.diaryEntries.filter(e => e.beeHiveId == this.params.get('id'));
			this.getDiaryEntriesForDates(collection);
		}
	}
	
	/**
	 * Converts all date strings of
	 * all diaryEntries to Date objects.
	 */
	public convertDatesOfDiaryEntries() {
		this.diaryEntries = this.utils.mapDateStringsToDates('date', this.diaryEntries);
		this.diaryEntries = this.utils.mapDateStringsToDates('treatmentBegin', this.diaryEntries, 'Behandlung');
		this.diaryEntries = this.utils.mapDateStringsToDates('treatmentEnd', this.diaryEntries, 'Behandlung');
	}
	
	/**
	 * Event callback for search.
	 * Gets fired when search results are available.
	 */
	public search(eventArgs: string): void {
		//this.getDiaryEntriesForDates(eventArgs);
		let tempEntries = new Array<DiaryEntry>();
		this.searchService.search(eventArgs).subscribe(
			res => {
				tempEntries.push(res);
			},
			err => console.log(err),
			() => {
				tempEntries
					.filter(e => Object.prototype.toString.call(e.date) !== '[object Date]')
					.map(e => e.date = new Date(e.date));
				this.getDiaryEntriesForDates(tempEntries);
			}
		);
		this.showSearchResults = true;
	}
	
	/**
	 * Displays normal values again.
	 */
	public toggleSearchResults(): void {
		this.getDiaryEntriesForDates();
		this.showSearchResults = false;
	}
	
	/**
	 * Maps dates that are strings to Dates
	 */
	/*public mapDateStringsToDates(propertyName: string, option?: string): void {
		if (option == undefined) {
			this.allDiaryEntries
				.filter(e => e[propertyName] != undefined && e[propertyName] != null && e[propertyName] != NaN)
				.forEach(e => e[propertyName] = new Date(e[propertyName]));
		}
		else {
			this.allDiaryEntries
				.filter(e => entryTypeEnum[entryTypeEnum[e.type]] == option)
				.filter(e => e[propertyName] != undefined && e[propertyName] != null && e[propertyName] != NaN)
				.forEach(e => e[propertyName] = new Date(e[propertyName]));
		}
	}*/
	
	/**
	 * Gets a string array of
	 * all diaryEntries for search.
	 */
	/*public getStringsForSearch(): void {
		this.allDiaryEntries
		.forEach(e => this.searchStrings.push(JSON.stringify(e)));
	}*/
	
	/**
	 * Fills an Array with diary entries data.
	 * Key: Date
	 * Value: Array of DiaryEntries
	 */
	public getDiaryEntriesForDates(collection?: DiaryEntry[]): void {
		if (collection === undefined) {
			for (var k in this.entryDates) {
				this.diaryEntriesPerDate[this.entryDates[k].toDateString()] = 
				this.diaryEntries
					.filter(e => e.date != null && e.date != undefined)
					.filter(e => e.date.toDateString() == (this.entryDates[k]).toDateString())
					.sort((x, y) => x.beeHiveId > y.beeHiveId ? 1 : -1)
					.slice();
			}
		}
		else {
			for (var k in this.entryDates) {
				this.diaryEntriesPerDate[this.entryDates[k].toDateString()] = 
					collection
					.filter(e => e.date != null && e.date != undefined)
					.filter(e => e.date.toDateString() == (this.entryDates[k]).toDateString())
					.sort((x, y) => x.beeHiveId > y.beeHiveId ? 1 : -1)
					.slice();
			}
		}
	}
	
	public deleteDiaryEntry(id: string): void {
		let diaryentryToDelete: DiaryEntry;
		let index: number;
		
		diaryentryToDelete = this.diaryEntries.find(diaryentry => diaryentry._id == id);
		
		index = this.diaryEntries.indexOf(diaryentryToDelete);
		this.diaryEntries.splice(index, 1);
		
		index = this.diaryEntriesPerDate[diaryentryToDelete.date.toDateString()].indexOf(diaryentryToDelete);
		this.diaryEntriesPerDate[diaryentryToDelete.date.toDateString()].splice(index, 1);
		
		this.diaryEntryService
			.deleteElementById(id)
			.subscribe(
				res => console.log(res),
				err => console.log(err)
			);
	}
}