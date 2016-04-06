import {Injectable} from 'angular2/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

import {obj, Utilities} from './utilities.service';
import {DataService} from './dataservice';

@Injectable()
export class SearchService<T extends obj> {
	public searchCollection: Array<T> = [];
	public searchStrings: Array<string> = [];
	public dataService: DataService<T>;
	
	constructor(public utils: Utilities) {}
	/** Initializes search by filling search strings and the collection of elements */
	public initSearch(dataService: DataService<T>): void {
		this.dataService = dataService;
		const subscription = this.dataService.getElements().subscribe(
			res => {
				res.forEach(e => {
					this.searchStrings.push(JSON.stringify(e));
					this.searchCollection[e._id] = e;
				});
			},
			err => this.utils.errCallback(err),
			()  => console.log(`Loading search collection was successful.`)
		);
	}
	/** 
	 * Function for searching
	 * Creates a observable that emits search results
	 * Searches collection for matches
	 */
	public search(query: string = ""): Observable<T> {
		return Observable.create((observer: Observer<T>) => {
			if (query == "") {
				for (const key in this.searchCollection) {
					observer.next(this.searchCollection[key]);
				}
			}
			else {
				this.searchStrings
					.filter(e => e.toUpperCase().indexOf(query.toUpperCase()) != -1)
					.forEach(f => {
						const parsedElement = this.searchCollection[JSON.parse(f)._id];
						if (parsedElement != undefined) observer.next(parsedElement);
					});
			}
			observer.complete();
		});
	}
}