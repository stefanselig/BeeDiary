import {Component, AfterViewInit, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {AuthService} from '../../services/auth.service';
// Refactor overall design and markup
// Angular 2 way to handle library loading
@Component({
	selector: 'login',
	template: `
		<div>
			<h1>BeeDiary</h1>
			<label>Via Google einloggen:</label>
			<button [id]="id" class="btn btn-default">Sign in via Google</button>
			<!--<div id="gSignInWrapper">
				<span class="label">Sign in with:</span>
				<div id="customBtn" class="customGPlusSignIn">
				<span class="icon"></span>
				<span class="buttonText">Google</span>
				</div>
			</div>-->
  			<!--<button [id]="id">signin button</button>-->
			<!--<button [id]="id" (click)="signupService.init()">Sign In</button>-->
			<!--<div class="g-signin2" data-onsuccess="onSignIn" *ngIf="showsignin"></div>-->
		</div>
	`
})
export class LogInComponent implements AfterViewInit {
	id: string = "signInButton";
	test: any;
	
	constructor(public authService: AuthService, params: RouteParams) {
		if (params.get('logOut') == "true") {
			this.authService.signOut();
		}
	}
	
	ngAfterViewInit() {
		setTimeout(() => {
			this.authService.registerClickHandler(this.id);
		}, 500);
	}
}