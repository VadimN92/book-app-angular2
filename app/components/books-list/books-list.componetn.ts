import { Component, OnInit } from '@angular/core';

import { BooksService } from '../../services/books.service';

@Component({
	selector: 'books-list',
	templateUrl: './app/components/books-list/books-list.componetn.html'
})

export class BooksListComponent implements OnInit {

	booksC: Array<any>;
	deleteBook: any;

	constructor(
		private booksService: BooksService
		) {}

	ngOnInit() {
		
		this.booksService.getBooks()
			.then(res => {
				console.log(res);	
				this.booksC = this.booksService.books;
			})
			.catch(err => {
				console.error(err);
			});
	}

	onDeleteBook() {
		this.booksService.deleteBook(this.deleteBook.id);
	}

	openModalDelete(book: any) {
		console.log(book);
		this.deleteBook = book;
	}
	

}