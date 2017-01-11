import { Injectable, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class AuthorFormService {

  authorFormChange: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  createFormAuthor(author: any = {name: '', id: null}): FormGroup {
    return this.formBuilder.group({
      name: [author.name, Validators.required],
      id: author.id
    });
  }

  updateAuthorForm(author: any) {
    var updatedForm = this.createFormAuthor(author);
    this.authorFormChange.emit(updatedForm);
  }

  getAuthorFormChange() {
    return this.authorFormChange;
  }

}
