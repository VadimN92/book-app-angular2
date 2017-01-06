import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../services/authors.service';

@Component({
	selector: 'books-add',
	templateUrl: './app/components/books-add/books-add.componetn.html'
})

export class BooksAddComponent implements OnInit {
	addBookForm: FormGroup;
	bookAuthors: Array<any>;
	constructor(
		private booksService: BooksService,
		private authorsService: AuthorsService ) {}

	ngOnInit() {
		this.addBookForm = new FormGroup({
			name: new FormControl(''),
			authorId: new FormControl('')
		})

		this.authorsService.getAuthors()
			.then(res => {
				console.log(res);	
				this.bookAuthors = this.authorsService.authors;
			})
			.catch(err => {
				console.error(err);
			});
	}

	onBookAdd(newBook: any) {

		console.log(newBook);
		this.booksService.addBook(newBook);
		this.addBookForm.reset()
	}

}