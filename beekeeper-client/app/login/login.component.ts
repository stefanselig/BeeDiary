import {Component, AfterViewInit} from 'angular2/core';

@Component({
	selector: 'login',
	template: `
		<div id="signinbutton" style="display: inline;"></div>
		<button (click)="signOut()" class="btn btn-default">Log Out</button>
	`
})
export class LogInComponent implements AfterViewInit {
	displaySignInButton: boolean = false;
	
	/*onSignIn(googleUser) {
		const profile = googleUser.getBasicProfile();
		console.log('ID: ' + profile.getId());
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail());
	}*/
	
	waitForLib() {
		window.setTimeout(this.renderButton, 2000);
	}
	
	renderButton() {
		gapi.signin2.render('signinbutton', {
			'width': 240,
			'height': 50,
			'theme': 'dark',
			'onsuccess': function (googleUser) {
				const profile = googleUser.getBasicProfile();
				console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
				console.log('Name: ' + profile.getName());
				console.log('Image URL: ' + profile.getImageUrl());
				console.log('Email: ' + profile.getEmail());
				const idToken = googleUser.getAuthResponse().id_token;
				console.log(idToken);
			},
			'onfailure': function (err) {
				console.log(`error is: ${err}`);
			}
		});
    }
	
	signOut() {
		const auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
			console.log('User signed out.');
		});
  	}
	
	ngAfterViewInit() {
		this.waitForLib();
	}
}