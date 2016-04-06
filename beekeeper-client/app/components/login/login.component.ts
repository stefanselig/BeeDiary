import {Component, AfterViewInit, EventEmitter} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'login',
	template: `
		<div *ngIf="!loginSuccessful">
			<img src="beediary_logo.svg" />
			<div style="margin-left:auto; margin-right: auto; width:120px;">
				<label>Google Login</label>
				<div [id]="id">Sign in via Google</div>
			</div>
		</div>
		<div *ngIf="!showLogin">
			<h2>Eingeloggt als {{authService.getUserName()}}</h2>
			<button [routerLink]="['BeeHives']" class="btn btn-default">Bienenstöcke</button>
			<button [routerLink]="['DiaryEntries']" class="btn btn-default">Tagebucheinträge</button>
			<button [routerLink]="['DashBoard']" class="btn btn-default">Dashboard</button>
		</div>
	`,
	directives: [ROUTER_DIRECTIVES]
})
export class LogInComponent implements AfterViewInit {
	id: string = "signInButton";
	test: any;
	public showLogin: boolean = true;
	public loginSuccessful: boolean = false;
	/** Signs user out if passed logOut param was true */
	constructor(public authService: AuthService, params: RouteParams, public router: Router) {
		if (params.get('logOut') == "true") {
			this.authService.signOut();
		}
		if (params.get('showLogin') == "true") {
			this.showLogin = true;
			this.loginSuccessful = false;	
		}
	}
	/** Registers a click handler for the sign in button after view is initialized */
	ngAfterViewInit() {
		setTimeout(() => {
			this.authService.registerClickHandler(this.id, (message: string) => {
				if (message == "success") {
					this.showLogin = false;
					this.loginSuccessful = true;
				}
				else {
					this.showLogin = true;
					this.loginSuccessful = false;
				}
			});
		}, 500);
	}
}