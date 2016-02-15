import {Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked} from 'angular2/core';
import {Router} from 'angular2/router';
import {DiaryEntryComponent} from './diaryentry.component';
import {DisplayDiaryEntryComponent} from './displaydiaryentry.component';
import {SearchComponent}	from './../../search/search.component';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'DiaryEntries',
	directives: [DisplayDiaryEntryComponent, SearchComponent],
	templateUrl: 'app/diaryentry/Templates/diaryentries.template.html',
	providers: [DiaryEntryService]
})
export class DiaryEntriesComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
	// This should be part of the diaryEntryService:
	public allDiaryEntries: any[] = [];
	
	// How to handle search results?
	public diaryEntries: any[] = [];
	
	// Check if still needed:
	public display: boolean = true;
	
	// Maybe better-describing name?
	public elementsStrings: string[] = [];
	
	public entryDates: Date[] = [];
	
	public diaryEntriesPerDate: any[][] = [];
	
	public selectedDate: string = "";
	
	public filterOptions: any[];
	
	//public distances: number[] = [];
	//public $window: any;
	
	public diaryEntryService: DiaryEntryService;
	public router: Router;

	constructor(diaryEntryService: DiaryEntryService, router: Router) {
		this.diaryEntryService = diaryEntryService;
		this.router = router;
	}
	
	ngOnInit(): void {
		this.loadDiaryEntries();
	}
	
	ngAfterViewInit(): void {
		this.initCalendar();
	}
	
	ngAfterViewChecked() {
    	//this.initNavBar();
  	}
	
	public initNavBar(): void {
		/*$('.navbar-lower').affix({
  			offset: {top: 50}
		});*/
		
		/*$('#navtry').first().affix({
  			offset: {top: 50}
		});*/
		/*window.setTimeout(x => $('#' + this.entryDates[0]).affix({
			offset: {top: 50}
		}), 1000);*/
		
		//var that = this;
		//var a = $('#groupedEntries').offset().top;
		//console.log(a);
		
		/*$('#dateNav').affix({
			offset: {top: 50}
		});
		
		that.entryDates.forEach(x => {
			$('#' + x).ready(() => {
				that.distances[x.toString()] = $('#' + x).offset().top;
				that.$window = $(window);
				that.$window.scroll(() => {
					if (that.$window.scrollTop() >= that.distances[x.toString()]) {
						$('#dateNav').html('<div class="navbar-brand">' + x.toString() + '</div>');
					}
				});
			});
		});*/
		
		
		
		/*$(document).ready(() => {
			//var a = $('#' + that.entryDates[0]).offset().top;
			//console.log(a);
			that.entryDates.forEach(x => {
				that.distances[x.toString()] = $('#' + x).offset().top;
				that.$window = $(window);
				that.$window.scroll((x) => {
					if (that.$window.scrollTop() >= that.distances[x.toString()]) {
						$('.navbar-lower').html(x);
					}
				});
			});
		});*/
		
		/*var distance = $('').offset().top;
		$window = $(window);
		
		$window.scroll(function() {
			if ( $window.scrollTop() >= distance ) {
				// Your div has reached the top
				var h = $('#el').html();
				$('.navbar-lower').html("hihihihihihih");
			}
		});*/
		
		
		
		/*
		
		var distance = $('#el').offset().top,
		$window = $(window);

		$window.scroll(function() {
			if ( $window.scrollTop() >= distance ) {
				// Your div has reached the top
				var h = $('#el').html();
				$('.navbar-lower').html("hihihihihihih");
			}
		});
		
		var ddistance = $('#elel').offset().top,
		$window = $(window);

		$window.scroll(function() {
			if ( $window.scrollTop() >= ddistance ) {
				// Your div has reached the top
				var h = $('#elel').html();
				$('.navbar-lower').html("huhuhu");
			}
		});*/
		/*
		this.entryDates.forEach(e => {
			var distance = $('#el').offset().top,
			$window = $(window);

			$window.scroll(function() {
				if ( $window.scrollTop() >= distance ) {
					// Your div has reached the top
					var h = $('#el').html();
					$('.navbar-lower').html("hihihihihihih");
				}
			});
		});*/
		
	}
	
	/*public loadDiaryEntriesForDate(selectedDate: string, d, ad): void {*/
		/*this.diaryEntries = [];
		this.allDiaryEntries
		.filter(e => (new Date(e.date)).toDateString() == (new Date(selectedDate).toDateString()))
		.map(el => this.diaryEntries.push(el));
		console.log(this.diaryEntries);*/
		/*d = [];
		ad.filter(e => (new Date(e.date)).toDateString() == (new Date(selectedDate).toDateString()))
		.map(el => d.push(el));
		console.log(d);
	}*/
	
		
	/*public getCalendarEntries(): any[] {
		if (this.selectedDate != "")
			return this.diaryEntriesPerDate[this.selectedDate];
		else
			return [];
	}*/
	
	ngOnDestroy(): void {
		this.allDiaryEntries = [];
		this.diaryEntriesPerDate = [];
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
				this.fillFilterOptions();
				this.convertDatesOfDiaryEntries();
				this.getStringsForSearch();
				this.getDates();
				this.getDiaryEntriesForDates();
			},
			err => console.error(err),
			()  => console.log("Load completed.")
		);
	}
	
	/**
	 * Fills the filterOptions array with data
	 */
	public fillFilterOptions(): void {
		if (this.allDiaryEntries.length > 0) {
			this.filterOptions = Object.getOwnPropertyNames(this.allDiaryEntries[0]).slice();
		}
	}
	
	/**
	 * Converts all date strings of
	 * all diaryEntries to Date objects.
	 */
	public convertDatesOfDiaryEntries() {
		this.mapDateStringsToDates('date');
		this.mapDateStringsToDates('treatmentBegin', 'treatment');
		this.mapDateStringsToDates('treatmentEnd', 'treatment');
		/*this.allDiaryEntries
		.filter(e => e.date != undefined && e.date != null && e.date != NaN)
		.forEach(e => e.date = new Date(e.date));
		this.allDiaryEntries
		.filter(e => e.type == 'treatment')
		.filter(e => e.treatmentBegin != undefined && e.treatmentBegin != null && e.treatmentBegin != NaN)
		.forEach(e => e.treatmentBegin = new Date(e.treatmentBegin));
		this.allDiaryEntries
		.filter(e => e.type == 'treatment')
		.filter(e => e.treatmentEnd != undefined && e.treatmentEnd != null && e.treatmentEnd != NaN)
		.forEach(e => e.treatmentEnd = new Date(e.treatmentEnd));*/
	}
	
	public retrieveSearchResults(eventArgs: any[]): void {
		//console.log(eventArgs);
		this.diaryEntries = eventArgs.slice();
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
				.filter(e => e.type == option)
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
		.forEach(e => this.elementsStrings.push(JSON.stringify(e)));
	}
	
	/**
	 * Gets all Dates of all
	 * diaryEntries and saves
	 * them into an array.
	 */
	public getDates(): void {
		let dates = this.allDiaryEntries
					.map(e => e.date)
					.filter(e => e != null)
					.map(e => e.toDateString());
		this.entryDates = dates
							.filter((e, i) => dates.indexOf(e) == i)
							.map(e => new Date(e))
							.sort();
	}
	
	/**
	 * Fills a dictionary of Arrays of DiaryEntries
	 * with data.
	 * Key: toDateString() of Date value
	 * Value: Array of DiaryEntries
	 */
	public getDiaryEntriesForDates(): any {
		for (var k in this.entryDates) {
			this.diaryEntriesPerDate[this.entryDates[k].toDateString()] = this.allDiaryEntries
			.filter(e => (new Date(e.date)).toDateString() == (this.entryDates[k]).toDateString())
			.slice();
		}
	}
	
	public createDiaryEntry(): void {
		this.router.navigate(['CreateDiaryEntry']);
	}
	
	/**
	 * Initiates a jQuery UI Calendar
	 */
	public initCalendar(): void {
		var that = this;
		$('<div id="calendar" class="col-sm-4"></div>').insertBefore('#diaryEntryContainer');
		$('#calendar').datepicker({
			inline: true,
			firstDay: 1,
			showOtherMonths: true,
			dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			onSelect: function (date: string) {
				that.selectedDate = (new Date(date)).toDateString();
			},
			nextText: "&rarr;",
			prevText: "&larr;"
		});
	}
}