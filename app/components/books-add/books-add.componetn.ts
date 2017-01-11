import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../services/authors.service';
import { BookFormService } from '../../forms/book-fotm.service';

@Component({
	selector: 'books-add',
	templateUrl: './app/components/books-add/books-add.componetn.html'
})

export class BooksAddComponent implements OnInit, OnDestroy {
	addBookForm: FormGroup;
	bookAuthors: Array<any>;
	subBookForm: any;

	constructor(
		private booksService: BooksService,
		private authorsService: AuthorsService,
    private bookFormService: BookFormService) {}

	ngOnInit() {
	  /* Create form */
    this.addBookForm = this.bookFormService.createBookForm();

		this.authorsService.getAuthors()
			.then(res => {
				console.log(res);
				this.bookAuthors = this.authorsService.authors;
			})
			.catch(err => {
				console.error(err);
			});

		this.subBookForm = this.bookFormService.getBookFormChange()
			.subscribe((form: FormGroup) => {
				this.addBookForm = form;
			});
	}

	ngOnDestroy() {
		this.subBookForm.unsubscribe();
	}

	onBookSubmit(book: any) {

		if(book.id) {
			this.booksService.editBook(book);
		} else {
			this.booksService.addBook(book);
		}

		this.addBookForm.reset();
	}

	onCancelEdit() {
		this.addBookForm.reset();
	}

}
