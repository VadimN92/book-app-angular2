import { Injectable } from '@angular/core';

import { HttpApiService } from '../api/http-api.service';
import { AuthService } from './auth.service';

@Injectable()
export class BooksService {
	public books: Array<any>;

	constructor(
		private httpApiService: HttpApiService,
		private authService: AuthService) {}

	addBook(book: any) {
		this.httpApiService.addBook(book).toPromise().then(data => {
			this.books.push(data.json());
		});
	}
	getBooks() {
		return this.httpApiService.getBooks().toPromise()
			.then(data => {
				console.log('run getBooks');
				this.books = data.json()
			});
	}

	editBook(nbook: any) {
		this.httpApiService.bookEdit(nbook.id, nbook).toPromise().then(data => {
			var res = data.json();
			var book = this.books.find(b => b.id == res.author.id);

			console.log( this.books);
			console.log( res);
			console.log(book);

			if(book) {

				book.name = res.name;
				book.author = res.author;
				console.log(book);
			}
		})
	}

	deleteBook(id: string) {
		this.httpApiService.deleteBook(id).toPromise().then(data => {
			var res = data.json();
			var bookIndex = this.books.findIndex(b => b.id == res.id);
			if(bookIndex != -1) {
				this.books.splice(bookIndex, 1);
			}
		}).catch(err => {
			this.authService.isResponseAuth(err);
		})
	}

}
