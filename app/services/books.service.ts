import { Injectable, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpApiService } from '../api/http-api.service';
import { AuthService } from './auth.service';

@Injectable()
export class BooksService {
	public books: Array<any>;
	public bookForm: FormGroup;
	public bookFormChange: EventEmitter<any> = new EventEmitter();

	constructor(
		private httpApiService: HttpApiService,
		private formBuilder: FormBuilder,
		private authService: AuthService
		) {}

	createBookForm(book: any = {name: '', id: null, author: {id: '0'}}) {
		console.log(book);
		this.bookForm = this.formBuilder.group({
			name: [book.name, Validators.required],
			authorId: book.author.id,
			id: book.id
		});

		this.bookFormChange.emit(book);
	}

	getBookForm() {
		return this.bookForm;
	}

	getBookFormChange() {
		return this.bookFormChange;
	}

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