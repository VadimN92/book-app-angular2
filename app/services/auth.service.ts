import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { LoginUser } from '../classes/login-user';
import { HttpApiService } from '../api/http-api.service';

@Injectable()

export class AuthService implements OnInit {


	constructor(
		private router: Router,
		private httpApiService: HttpApiService) {}

	ngOnInit() {
		
	}

	ngOnDestroy() {
  	}

	login(user: any) {
		return this.httpApiService.loginUser(user).toPromise().then(data => data.json());
	}

	logout() {
		localStorage.removeItem('token');
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