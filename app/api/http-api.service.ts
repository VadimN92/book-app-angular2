import { Injectable } from '@angular/core';
import { Request, Response, Http } from '@angular/http';
import { LoginUser } from '../classes/login-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {RESTClient, GET, PUT, POST, DELETE, BaseUrl, Headers, DefaultHeaders, Path, Body, Query} from 'angular2-rest';

import { config } from '../config/config';
import { Router } from '@angular/router';

@Injectable()
@BaseUrl(config.serverPath)
@DefaultHeaders({
  //'Accept': 'application/json',
	'Content-Type': 'application/json'
})

export class HttpApiService extends RESTClient {

	/* if you have like this error (when you do 'npm start') : "
		app/services/http-api.service.ts(16,9): error TS2345: Argument of type 'Http' is not assignable to parameter of type 'Http'.
  	Property '_backend' is protected but type 'Http' is not a class derived from 'Http'.

	"
	just comment constructor
	*/
	constructor(http: Http) {
		super(http);
	}


/*	protected responseInterceptor(res: any): any {
		res.subscribe((r: any) => {
			console.log(r);
			this.responseChange.emit(r);
		});
        return res;
    }*/


	@POST('/api/login')
	public loginUser( @Body user: any): Observable<any> { return null; };

	/* @ AUTHORS */
	@GET('/api/authors')
	public getAuthors(): Observable<any> { return null; };

	@POST('/api/authors')
	public authorAdd( @Body author: any): Observable<any> { return null; };

	@PUT('/api/authors/{id}')
	public authorEdit( @Path ("id") id: string, @Body author: any): Observable<any> { return null; };

	@DELETE('/api/authors/{id}')
	public deleteAuthor( @Path("id") id: string): Observable<any> { return null; };
	/* /@ AUTHORS */

	/* @ BOOKS */
	
	@GET('/api/books')
	public getBooks(): Observable<any> { return null; };

	@POST('/api/books')
	public addBook( @Body author: any): Observable<any> { return null; };

	@PUT('/api/books/{id}')
	public bookEdit( @Path ("id") id: string, @Body book: any): Observable<any> { return null; };

	@DELETE('/api/books/{id}')
	public deleteBook( @Path("id") id: string): Observable<any> { return null; };
	/* /@ BOOKS */

}