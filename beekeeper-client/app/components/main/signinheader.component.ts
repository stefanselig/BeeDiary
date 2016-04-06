import {Component} from 'angular2/core';

import {AuthService} from '../../services/auth.service';

import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'signinheader',
	template: `
		<div style="float: right;" *ngIf="authService.getUserName() != ''">
			<p class="navbar-text">Eingeloggt als {{authService.getUserName()}}</p>
			<button [routerLink]="['LogIn', {logOut: 'true'}]" class="btn btn-default navbar-btn">Log Out</button>
		</div>
	`,
	directives: [ROUTER_DIRECTIVES]
})
export class SignInHeader {
	/** No logic, unique purpose is displaying the username and a logout button if user is signed in */
	constructor(public authService: AuthService, router: Router) {}
}