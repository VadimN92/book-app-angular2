import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpApiService } from '../api/http-api.service';

@Injectable()
export class BooksService {
	public books: Array<any>;
	public bookForm: FormGroup;

	constructor(
		private httpApiService: HttpApiService,
		private formBuilder: FormBuilder
		) {}

	createBookForm(book: any = {name: '', id: null, authorId: ''}) {
		this.bookForm = this.formBuilder.group({
			name: [book.name, Validators.required],
			authorId: [book.authorId, Validators.required]
		})
	}

	getBookForm() {
		return this.bookForm;
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

	deleteBook(id: string) {
		this.httpApiService.deleteBook(id).toPromise().then(data => {
			var res = data.json();
			var bookIndex = this.books.findIndex(b => b.id == res.id);
			if(bookIndex != -1) {
				this.books.splice(bookIndex, 1);
			}
		}).catch(err => {
			console.log(err);
		})
	}

}