import {Injectable} from 'angular2/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

import {obj} from './utilities.service';
import {DataService} from './dataservice';

@Injectable()
export class SearchService<T extends obj> {
	// Refactor and make more performant
	public searchCollection: Array<T> = [];
	public searchStrings: Array<string> = [];
	public dataService: DataService<T>;
	
	public initSearch(dataService: DataService<T>): void {
		this.dataService = dataService;
		
		const subscription = this.dataService.getElements().subscribe(
			res => {
				res.forEach(e => {
					this.searchStrings.push(JSON.stringify(e));
					this.searchCollection[e._id] = e;
					//this.searchCollection.push(e);
				});
				//subscription.unsubscribe();
			},
			err => console.log(err),
			()  => console.log(`Loading search collection was successful.`)
		);
	}
	
	public search(query: string): Observable<T> {
		return Observable.create((observer: Observer<T>) => {
			if (query == "") {
				for (var key in this.searchCollection) {
					observer.next(this.searchCollection[key]);
				}
				observer.complete();
				/*this.searchCollection.forEach((e: T) => {
					observer.next(e);
				});*/
			}
			else {
				this.searchStrings
					.filter(e => e.toUpperCase().indexOf(query.toUpperCase()) != -1)
					.forEach(f => {
						const parsedElement = this.searchCollection[JSON.parse(f)._id];
						if (parsedElement != undefined) {
							observer.next(parsedElement);
						}
						/*this.searchCollection
						.filter(x => x._id == JSON.parse(f)._id)
						.forEach(y => observer.next(y));*/
					});
				observer.complete();
			}
		});
		//return source;
	}
}