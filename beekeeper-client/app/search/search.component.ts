import {Component, EventEmitter}	from 'angular2/core';
@Component({
	selector: 'search',
	template: `
		<form (ngSubmit)="search()" #searchForm="ngForm" style="display: inline;">
			<input type="search" [(ngModel)]="query" [size]="('Durchsuche ' + name).length" [placeholder]="'Durchsuche ' + name" class="form-control"/>
			<button type="submit" class="btn btn-default form-control">
				<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
			</button>
		</form>
	`,
	inputs: ['collection', 'searchStrings', 'name'],
	outputs: ['OnSearchResult']
})
export class SearchComponent {
	public query: string = "";
	
	// TODO: Refactor to use generics (Array<T>)
	public collection: any[] = [];
	public searchStrings: string[] = [];
	public name: string = "";
	
	public OnSearchResult: EventEmitter<any[]> = new EventEmitter<any[]>();
	  
	ngAfterContentChecked() {}
	
	/**
	 * Takes a search query and performs a search
	 */
	public search(): void {
		let searchResults = [];
		if (this.query == undefined) {
			searchResults = this.collection.slice();
		}
		else {
			this.searchStrings
				.filter(e => e.toUpperCase().indexOf(this.query.toUpperCase()) != -1)
				.forEach(e => this.collection
					.filter(x => x._id == JSON.parse(e)._id)
					.forEach(y => searchResults.push(y)));
		}
		this.query = "";
		this.OnSearchResult.emit(searchResults);
	}
}