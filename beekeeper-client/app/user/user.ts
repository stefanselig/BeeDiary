export class User {
	public _email: string;
	public _password: string;
	
	public getEmail() : string {
		return this._email;
	}
	
	public setEmail(email : string): void {
		this._email = email;
	}
	
	public getPassword() : string {
		return this._password;
	}
	
	public setPassword(password : string): void {
		this._password = password;
	}
	
	constructor(email?: string, password?: string) {
		if (email != undefined)
			this._email = email;
		if (password != undefined)
			this._password = password;
	}
}