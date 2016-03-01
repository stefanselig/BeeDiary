import {Injectable} from 'angular2/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

import {obj} from '../../utilities.service';

@Injectable()
export class SearchService<T extends obj> {
	public searchCollection: Array<T> = [];
	public searchStrings: Array<string> = [];
	public dataService: any;
	
	public initSearch(dataService: any): void {
		this.dataService = dataService;
		
		const subscription = this.dataService.getElements().subscribe(
			res => {
				res.forEach(e => {
					this.searchStrings.push(JSON.stringify(e));
					//this.searchCollection.push(e);
					this.searchCollection[e._id] = e;
				});
				subscription.unsubscribe();
			} 
		);
	}
	
	public search(query: string): Observable<T> {
		const source = Observable.create((observer: Observer<T>) => {
			if (query == "") {
				for (var key in this.searchCollection) {
					observer.next(this.searchCollection[key]);
				}
				/*this.searchCollection.forEach((e: T) => {
					observer.next(e);
				});*/
				observer.complete();
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
		return source;
	}
}