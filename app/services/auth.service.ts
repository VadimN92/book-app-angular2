import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/toPromise';


import { LoginUser } from '../classes/login-user';
import { HttpApiService } from '../api/http-api.service';

@Injectable()

export class AuthService implements OnInit {


	constructor(
		private router: Router,
		private httpApiService: HttpApiService,
		private cookieService: CookieService) {}

	ngOnInit() {
		
	}

	ngOnDestroy() {
  	}

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

	isResponseAuth(response: Response) {
		if(response.status == 401) {
			this.logout();
		}
	}

}