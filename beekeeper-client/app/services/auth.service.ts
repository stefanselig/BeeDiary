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
	
	getUserName(): string {
		return this.googleUser == undefined ? "" : this.googleUser.getBasicProfile().getName();
	}
	
	init(): void {
		gapi.load("auth2", () => {
			const options = {
				client_id: CLIENT_ID,
				cookiepolicy: 'single_host_origin'
			};
			this.googleAuth = gapi.auth2.init(options);
		});
	}
	
	registerClickHandler(id): void {
		this.googleAuth.attachClickHandler(document.getElementById(id), {}, (user) => {
				this.googleUser = <gapi.auth2.GoogleUser> user;
				console.log(this.googleUser.getAuthResponse().id_token);
				this.token = this.googleUser.getAuthResponse().id_token;
				//this.router.navigate(['BeeHives']);
		}, err => console.log(err));
	}
	
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

//export var oauthObject;
			//window.alert("hi");
		/*setTimeout(() => {
			const options = {
				client_id:'766450771509-6udg4kpcrarlvq9rm9tqskn3epmv94f4.apps.googleusercontent.com'
			};
			this.googleAuth = gapi.auth2.init(options);
			console.log(this.googleAuth.isSignedIn.get());
			window.alert("hi");
			this.googleAuth.isSignedIn.listen((signedIn: boolean) => {
				console.log(signedIn);
			});
		}, 10000);*/
		//window.setTimeout();
				/*this.http.get(`https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&redirect_uri=localhost:3000/beehives%2Foauthcallback&response_type=token&client_id=766450771509-6udg4kpcrarlvq9rm9tqskn3epmv94f4.apps.googleusercontent.com&nonce=abc`)
			.map(res => res.json())
			.subscribe(res => console.log(res));*/
			
					/*console.log("hi");
			const options = {
				client_id:'766450771509-6udg4kpcrarlvq9rm9tqskn3epmv94f4.apps.googleusercontent.com'
			};
			this.googleAuth = gapi.auth2.init(options);
			console.log(this.googleAuth.isSignedIn.get());*/
		/*const options = {
			client_id:'766450771509-6udg4kpcrarlvq9rm9tqskn3epmv94f4.apps.googleusercontent.com'
		};
		this.googleAuth = gapi.auth2.init(options);
		console.log(this.googleAuth.isSignedIn.get());
		this.googleAuth.isSignedIn.listen((signedIn: boolean) => {
			console.log(signedIn);
		});*/
		
		//this.userName = user.getBasicProfile().getName();
		//console.log(this.userName);
		//console.log(this.googleUser.getBasicProfile().getName());