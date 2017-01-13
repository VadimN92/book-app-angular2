import { NgModule, APP_INITIALIZER }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { ModalModule } from "ng2-modal";



import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.componetn';
import { AuthorsAddComponent } from './components/authors-add/authors-add.componetn';
import { AuthorComponent } from './components/author/author.component';
import { BooksAddComponent } from './components/books-add/books-add.componetn';
import { BooksListComponent } from './components/books-list/books-list.componetn';
import { BookComponent } from './components/book/book.component';

import { AuthService } from './services/auth.service';
import { HttpApiService } from './api/http-api.service';
import { AuthGuard } from './services/auth-guard';
import { AuthorsService } from './services/authors.service';
import { BooksService } from './services/books.service';
import { LoginFormService } from './forms/login-form.service';
import { BookFormService } from './forms/book-fotm.service';
import { AuthorFormService } from './forms/author-form.service';

import { routing } from './routing';

/*function configServiceFactory (authService: AuthService) {
  return () => authService.preLoadMethod();
}*/

@NgModule({
  imports:      [
  	BrowserModule,
    HttpModule,
    ReactiveFormsModule,
  	routing,
    ModalModule
  ],
  declarations: [
  	AppComponent,
  	HomeComponent,
  	LoginComponent,
  	NotFoundComponent,
    AuthorComponent,
    AuthorsComponent,
    AuthorsListComponent,
    AuthorsAddComponent,
    BookComponent,
    BooksComponent,
    BooksAddComponent,
    BooksListComponent
  ],
  providers: [
    CookieService,
    AuthGuard,
    AuthService,
  	HttpApiService,
    AuthorsService,
    BooksService,
    LoginFormService,
    BookFormService,
    AuthorFormService,
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.preLoadMethod(),
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
