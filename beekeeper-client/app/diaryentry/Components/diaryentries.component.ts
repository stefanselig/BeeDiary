import {Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked} from 'angular2/core';
import {Router} from 'angular2/router';

import {DiaryEntryComponent} from './diaryentry.component';
import {DisplayDiaryEntryComponent} from './displaydiaryentry.component';
import {SearchComponent}	from './../../search/search.component';
import {DiaryEntryService}	from './../services/diaryentry.service';
import {DiaryEntry} from './../../build-client/DiaryEntry/DiaryEntry';

@Component({
	selector: 'DiaryEntries',
	directives: [DisplayDiaryEntryComponent, SearchComponent],
	template: `
		<h1>Deine Tagebucheinträge: </h1>
		<div class="row">
			<div class="form-group form-inline">
				<search [collection]="allDiaryEntries" [searchStrings]="searchStrings" [name]="'Tagebucheinträge'" (OnSearchResult)="retrieveSearchResults($event)"></search>
				<button (click)="createDiaryEntry()" class="btn btn-default form-control">
					<span class="glyphicon glyphicon-file" aria-hidden="true"></span>
				</button>
				<button (click)="toggleSearchResults()" *ngIf="showSearchResults" class="btn btn-default form-control">Zurück zu den gruppierten Einträgen</button>
			</div>
			<div *ngFor="#date of entryDates" [id]="date">
				<h1>
					{{diaryEntriesPerDate[date.toDateString()].length == 0 ? "" : date.toDateString()}}
				</h1>
				<div class="row">
					<displaydiaryentry *ngFor="#diaryentry of diaryEntriesPerDate[date.toDateString()]" [diaryentry]="diaryentry" class="col-sm-4"></displaydiaryentry>
				</div>
			</div>
		</div>
	`
})
export class DiaryEntriesComponent implements OnInit {
	// This should maybe be part of the diaryEntryService:
	public allDiaryEntries: DiaryEntry[] = [];
	public diaryEntries: DiaryEntry[] = [];
	public searchStrings: string[] = [];
	public entryDates: Date[] = [];
	public diaryEntriesPerDate: any[][] = [];
	public showSearchResults: boolean = false;

	constructor(public diaryEntryService: DiaryEntryService, public router: Router) {}
	
	ngOnInit(): void {
		this.loadDiaryEntries();
	}
	
	/**
	 * Loads diary entries from the service.
	 */
	public loadDiaryEntries(): void {
		this.diaryEntryService
		.diaryEntries
		.subscribe(
			(res: DiaryEntry[]) => this.initDiaryEntries(res),
			err => console.error(err),
			()  => console.log("Load completed.")
		);
	}
	
	/**
	 * Initializes all necessary data
	 */
	public initDiaryEntries(res: DiaryEntry[]): void {
		this.allDiaryEntries = res.slice();
		this.convertDatesOfDiaryEntries();
		this.getStringsForSearch();
		this.getDates();
		this.getDiaryEntriesForDates();
	}
	
	/**
	 * Converts all date strings of
	 * all diaryEntries to Date objects.
	 */
	public convertDatesOfDiaryEntries() {
		this.mapDateStringsToDates('date');
		this.mapDateStringsToDates('treatmentBegin', 'treatment');
		this.mapDateStringsToDates('treatmentEnd', 'treatment');
	}
	
	/**
	 * Event callback for search.
	 * Gets fired when search results are available.
	 */
	public retrieveSearchResults(eventArgs: DiaryEntry[]): void {
		this.getDiaryEntriesForDates(eventArgs.slice());
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
	public mapDateStringsToDates(propertyName: string, option?: string): void {
		if (option == undefined) {
			this.allDiaryEntries
				.filter(e => e[propertyName] != undefined && e[propertyName] != null && e[propertyName] != NaN)
				.forEach(e => e[propertyName] = new Date(e[propertyName]));
		}
		else {
			this.allDiaryEntries
				.filter(e => e[e.type] == option)
				.filter(e => e[propertyName] != undefined && e[propertyName] != null && e[propertyName] != NaN)
				.forEach(e => e[propertyName] = new Date(e[propertyName]));
		}
	}
	
	/**
	 * Gets a string array of
	 * all diaryEntries for search.
	 */
	public getStringsForSearch(): void {
		this.allDiaryEntries
		.forEach(e => this.searchStrings.push(JSON.stringify(e)));
	}
	
	/**
	 * Fills an array with diaryEntry dates (without duplicates).
	 */
	public getDates(): void {
		// Gets all all dates as a date string
		const dateStrings = this.allDiaryEntries
					.map(e => e.date)
					.filter(e => e != null)
					.map(e => e.toDateString());
		// Copies all unique dates into entryDates array	
		this.entryDates = dateStrings
							.filter((e, i) => dateStrings.indexOf(e) == i)
							.map(e => new Date(e))
							.sort();
	}
	
	/**
	 * Fills an Array with diary entries data.
	 * Key: Date
	 * Value: Array of DiaryEntries
	 */
	public getDiaryEntriesForDates(collection?: DiaryEntry[]): void {
		if (collection == undefined) {
			for (var k in this.entryDates) {
				this.diaryEntriesPerDate[this.entryDates[k].toDateString()] = 
				this.allDiaryEntries
					.filter(e => e.date != null && e.date != undefined)
					.filter(e => e.date.toDateString() == (this.entryDates[k]).toDateString())
					.slice();
			}
		}
		else {
			for (var k in this.entryDates) {
				this.diaryEntriesPerDate[this.entryDates[k].toDateString()] = 
					collection
					.filter(e => e.date != null && e.date != undefined)
					.filter(e => e.date.toDateString() == (this.entryDates[k]).toDateString())
					.slice();
			}
		}
	}
	
	/**
	 * Event callback for create diary entry button click.
	 * Navigates to the create diary entry view.
	 */
	public createDiaryEntry(): void {
		this.router.navigate(['CreateDiaryEntry']);
	}
}