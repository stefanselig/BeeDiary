import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Http} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import {Observer}	from 'rxjs/Observer';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	googleAuth: gapi.auth2.GoogleAuth;
	googleUser: gapi.auth2.GoogleUser;
	token: string;
	
	constructor(public http: Http, public router: Router) {
		this.init();
	}
	/** Gets username of currently loggin in user */
	getUserName(): string {
		return this.googleUser == undefined ? "" : this.googleUser.getBasicProfile().getName();
	}
	/** Loads Google Auth Library */
	init(): void {
		gapi.load("auth2", () => {
			const options = {
				client_id: CLIENT_ID,
				cookiepolicy: 'single_host_origin'
			};
			this.googleAuth = gapi.auth2.init(options);
		});
	}
	/** Adds google signin functionality to a button */
	registerClickHandler(id, callback: (message: string) => void): void {
		gapi.signin2.render(id,{
			onsuccess: (user) => {
				this.googleUser = <gapi.auth2.GoogleUser> user;
				this.token = this.googleUser.getAuthResponse().id_token;
				callback("success");
			},
			onfailure: (err) => {
				console.log(err);
				callback("failure");
			}
		});
	}
	/** Signs out a google user */
	signOut(): void {
		this.googleAuth
			.signOut()
			.then(() => {
				console.log("Logged out.");
				this.googleUser = undefined;
				this.token = undefined;
			});
	}
}