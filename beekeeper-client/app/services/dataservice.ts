import {Injectable} from 'angular2/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Http, Headers, RequestOptionsArgs} from 'angular2/http';

export interface IDataService<T> {
	elements: Observable<Array<T>>;
	generalHeaders: Headers;
	
	getElements(path:string): Observable<Array<T>>;
	getElementsForSaving(path:string): void;
	
	getElementById(path: string): Observable<T>;
	deleteElementById(path: string): Observable<string>;
	
	createElement(path: string, element: string): Observable<string>;
	updateElement(path: string, element: string): Observable<string>;
}

@Injectable()
export class DataService<T> implements IDataService<T> {
	elements: Observable<Array<T>>;
	generalHeaders: Headers;
	requestOptions: RequestOptionsArgs;
	url: string = 'http://localhost:8080/api/';
	
	constructor(public http: Http, public path: string) {
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
		this.requestOptions = {headers: this.generalHeaders};
		this.getElementsForSaving();
	}
	
	getElements(): Observable<Array<T>> {
		return this.http.get(this.url+this.path).map(res => res.json());
	}
	
	getElementsForSaving(): void {
		this.elements = this.http.get(this.url+this.path).map(res => res.json());
	}
	
	getElementById(id: string): Observable<T> {
		return this.http.get(this.url+this.path+id, this.requestOptions).map(res => res.json());
	}
	
	deleteElementById(id: string): Observable<string> {
		return this.http.delete(this.url+this.path+id,this.requestOptions).map(res => res.json());
	}
	
	createElement(element: string): Observable<string> {
		return this.http.post(this.url+this.path, element, this.requestOptions).map(res => res.json());
	}
	
	updateElement(element:string, id:string): Observable<string> {
		return this.http.put(this.url+this.path+id, element, this.requestOptions).map(res => res.json());
	}
}