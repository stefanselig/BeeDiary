import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Http, Headers, RequestOptionsArgs} from 'angular2/http';

import {AuthService} from './auth.service';

export interface IDataService<T> {
	elements: Observable<Array<T>>;
	generalHeaders: Headers;
	
	getElements: (path:string) => Observable<Array<T>>;
	getElementsForSaving: (path:string) => void;
	
	getElementById: (path: string) => Observable<T>;
	deleteElementById: (path: string) => Observable<string>;
	
	createElement: (path: string, element: string) => Observable<string>;
	updateElement: (path: string, element: string) => Observable<string>;
}

@Injectable()
export class DataService<T> implements IDataService<T> {
	token: any;
	elements: Observable<Array<T>>;
	generalHeaders: Headers;
	requestOptions: RequestOptionsArgs;
	url: string = 'http://localhost:8080/api/';
	
	constructor(public http: Http, public path: string, public router: Router, public auth?: AuthService) {
		this.setHeaders();
		this.getElementsForSaving();
	}
	/** Checks http status */
	checkStatus(res): boolean {
		if (res.status != 200) {
			this.router.navigate(['LogIn']);
			return false;	
		}
		return true;
	}
	/** Returns data if ok */
	getDataIfOk(res: any): any {
		let status = true;
		status = this.checkStatus(res);
		if (status == true) return res.json();
		return null;
	}
	/** Sets request headers by including the authentication token */
	setHeaders(): void {
		this.generalHeaders = new Headers();
		this.generalHeaders.append('Content-Type', 'application/json');
		this.generalHeaders.append('token', this.auth.token);
		this.requestOptions = {headers: this.generalHeaders};
	}
	/** HTTP GET call with authentication check */
	getWithAuthCheck(param: string = ""): Observable<any> {
		this.setHeaders();
		return this.http.get(this.url+this.path+param, this.requestOptions).map(res => this.getDataIfOk(res));
	}
	/** HTTP DELETE call with authentication check */
	deleteWithAuthCheck(id: string): Observable<any> {
		this.setHeaders();
		return this.http.delete(this.url+this.path+id,this.requestOptions).map(res => this.getDataIfOk(res));
	}
	/** HTTP POST call with authentication check */
	createWithAuthCheck(element, param: string = ""): Observable<any> {
		this.setHeaders();
		return this.http.post(this.url+this.path+param, element, this.requestOptions).map(res => this.getDataIfOk(res));
	}
	/** HTTP PUT call with authentication check */
	updateWithAuthCheck(element: string, id: string): Observable<any> {
		this.setHeaders();
		return this.http.put(this.url+this.path+id, element, this.requestOptions).map(res => this.getDataIfOk(res));
	}
	/** HTTP GET call to get elements */
	getElements(): Observable<Array<T>> {
		return this.auth != undefined ? this.getWithAuthCheck() : this.http.get(this.url+this.path).map(res => res.json());
	}
	/** HTTP GET call to get elements and saving them in the service */
	getElementsForSaving(): void {
		this.elements = this.auth != undefined ? this.getWithAuthCheck() : this.http.get(this.url+this.path).map(res => res.json());
	}
	/** HTTP GET call to get element by id */
	getElementById(id: string): Observable<T> {
		return this.auth != undefined ? this.getWithAuthCheck(id) : this.http.get(this.url+this.path+id, this.requestOptions).map(res => res.json());
	}
	/** HTTP DELETE call to delete element by id */
	deleteElementById(id: string): Observable<string> {
		return this.auth != undefined ? this.deleteWithAuthCheck(id) : this.http.delete(this.url+this.path+id, this.requestOptions).map(res => res.json());
	}
	/** HTTP POST call to create new element */
	createElement(element: string): Observable<string> {
		return this.auth != undefined ? this.createWithAuthCheck(element) : this.http.post(this.url+this.path, element, this.requestOptions).map(res => res.json());
	}
	/** HTTP PUT call to update element */
	updateElement(element:string, id:string): Observable<string> {
		return this.auth != undefined ? this.updateWithAuthCheck(element, id) : this.http.put(this.url+this.path+id, element, this.requestOptions).map(res => res.json());
	}
}