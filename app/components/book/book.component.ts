import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
	selector: 'book',
	templateUrl: './app/components/book/book.component.html'
})

export class BookComponent {
	constructor(private booksService: BooksService) {}

	@Input('data') book: any;
	@Output() deleteBook = new EventEmitter();

	onDeleteBook(book: any) {
		this.deleteBook.emit(book);
	}

	onEditBook(book: any) {
		this.booksService.createBookForm(book);
	}
	
}