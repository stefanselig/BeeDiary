import {Component, AfterContentChecked, EventEmitter}	from 'angular2/core';
@Component({
	selector: 'search',
	template: `
		<form (ngSubmit)="search(searchForm)" #searchForm="ngForm" style="display: inline;">
			<input type="search" ngControl="query" [placeholder]="'Suche nach ' + name" class="form-control"/>
			<!--Use filter: 
			<input type="checkbox" #useFilter (click)="true"/>
			<div *ngIf="useFilter.checked" style="display:inline;">
				Filter by: 
				<select ngControl="option">
					<option *ngFor="#opt of filterOptions" value="{{opt}}">
						{{opt}}
					</option>
				</select>
			</div>-->
			<button type="submit" class="btn btn-default" class="form-control">
				<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
			</button>
		</form>
	`,
	inputs: ['collection', 'searchStrings', 'name'],
	outputs: ['OnSearchResult']
})
export class SearchComponent implements AfterContentChecked {
	public filterOptions: string[] = [];
	public searchResults: any[] = [];
	
	// TODO: Refactor to use generics (Array<T>)
	public collection: any[] = [];
	public searchStrings: string[] = [];
	public name: string = "";
	
	public OnSearchResult: EventEmitter<any[]> = new EventEmitter<any[]>();
	  
	ngAfterContentChecked() {
		this.fillFilterOptions();
	}
	
	/**
	 * Fills the filterOptions array with data
	 */
	public fillFilterOptions(): void {
		if (this.collection.length > 0) {
			this.filterOptions = Object.getOwnPropertyNames(this.collection[0]).slice();
		}
	}
	
	/**
	 * Takes a search query and performs a search
	 */
	public search(formContent: any): void {
		const query: string = formContent.value.query;
		const filterOption: string = formContent.value.option;
		this.searchResults.length = 0;
		
		// TODO: Show tab on submit
		
		//$('#searchResults').tab('show');
		
		if (query == undefined) {
			this.searchResults = this.collection.slice();
		}
		else {
			if (filterOption == undefined) {
				this.searchStrings
					.filter(e => e.toUpperCase().indexOf(query.toUpperCase()) != -1)
					.forEach(e => this.collection
						.filter(x => x._id == JSON.parse(e)._id)
						.forEach(y => this.searchResults.push(y)));
			}
			else {
				this.searchStrings
					.map(e => JSON.parse(e))
					.filter(e => e[filterOption] == query)
					.forEach(e => this.collection
							.filter(x => x._id == e._id)
							.forEach(y => this.searchResults.push(y)));	
			}
		}
		this.OnSearchResult.emit(this.searchResults);
	}
}