import { Injectable, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable()
export class BookFormService {
  bookFormChange: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  createBookForm(book: any = {name: '', id: null, author: {id: '0'}}): FormGroup {
    return this.formBuilder.group({
      name: [book.name, Validators.required],
      authorId: book.author.id,
      id: book.id
    });
  }

  updateBookForm(book: any) {
    var updatedForm = this.createBookForm(book);
    this.bookFormChange.emit(updatedForm);
  }

  getBookFormChange() {
    return this.bookFormChange;
  }

}
