import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/toPromise';


import { LoginUser } from '../classes/login-user';
import { HttpApiService } from '../api/http-api.service';

@Injectable()

export class AuthService {

	constructor(
		private router: Router,
		private httpApiService: HttpApiService,
		private cookieService: CookieService) {}

	login(user: any) {
		return this.httpApiService.loginUser(user).toPromise();
	}

	logout() {
		// remove cookies
		this.cookieService.remove('token');
		localStorage.removeItem('isAuth');
		this.router.navigate(['login']);
	}

	checkCredentionals() {
		if(localStorage.getItem('isAuth') == null) {
			this.router.navigate(['login']);
		}
	}

	isLogined() {
		return JSON.parse(localStorage.getItem('isAuth'));
	}

}