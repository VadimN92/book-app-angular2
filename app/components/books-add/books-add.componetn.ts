import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../services/authors.service';

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
		private authorsService: AuthorsService ) {}

	ngOnInit() {
		this.booksService.createBookForm();
		this.addBookForm = this.booksService.getBookForm();

		this.authorsService.getAuthors()
			.then(res => {
				console.log(res);	
				this.bookAuthors = this.authorsService.authors;
			})
			.catch(err => {
				console.error(err);
			});

		this.subBookForm = this.booksService.getBookFormChange()
			.subscribe((s:any) => {
				this.addBookForm = this.booksService.getBookForm();
			})
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