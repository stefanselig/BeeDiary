import {Injectable} from 'angular2/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Http, Headers, RequestOptionsArgs} from 'angular2/http';

import {AuthService} from './auth.service';

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
	token: any;
	elements: Observable<Array<T>>;
	generalHeaders: Headers;
	requestOptions: RequestOptionsArgs;
	url: string = 'http://localhost:8080/api/';
	
	constructor(public http: Http, public path: string, public auth?: AuthService) {
		this.setHeaders();
		this.getElementsForSaving();
	}
	
	setHeaders(): void {
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
		this.generalHeaders.append('token', this.auth.token);
		this.requestOptions = {headers: this.generalHeaders};
	}
	
	getElements(): Observable<Array<T>> {
		this.setHeaders();
		return this.http.get(this.url+this.path, this.requestOptions).map(res => res.json());
	}
	
	getElementsForSaving(): void {
		this.setHeaders();
		this.elements = this.http.get(this.url+this.path, this.requestOptions).map(res => res.json());
	}
	
	getElementById(id: string): Observable<T> {
		this.setHeaders();
		return this.http.get(this.url+this.path+id, this.requestOptions).map(res => res.json());
	}
	
	deleteElementById(id: string): Observable<string> {
		this.setHeaders();
		return this.http.delete(this.url+this.path+id,this.requestOptions).map(res => res.json());
	}
	
	createElement(element: string): Observable<string> {
		this.setHeaders();
		return this.http.post(this.url+this.path, element, this.requestOptions).map(res => res.json());
	}
	
	updateElement(element:string, id:string): Observable<string> {
		this.setHeaders();
		return this.http.put(this.url+this.path+id, element, this.requestOptions).map(res => res.json());
	}
}