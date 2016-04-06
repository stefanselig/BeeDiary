import {Component, EventEmitter} from 'angular2/core';

@Component({
	selector: 'search',
	template: `
		<form (ngSubmit)="onSearch.emit(query)" #searchForm="ngForm" style="display: inline;">
			<input type="search" (keyup)="onSearch.emit(query)" [(ngModel)]="query" 
				[size]="('Durchsuche ' + name).length" 
				[placeholder]="'Durchsuche ' + name" class="form-control"/>
			<button type="submit" class="btn btn-default form-control">
				<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
			</button>
		</form>
	`,
	inputs: ['name'],
	outputs: ['onSearch']
})
export class SearchComponent {
	/** Purpose is displaying a search form */
	public name: string = "";
	public onSearch: EventEmitter<string> = new EventEmitter<string>();
}