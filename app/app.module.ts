import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'angular2-cookie/services/cookies.service';



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

import { routing } from './routing';
 
@NgModule({
  imports:      [ 
  	BrowserModule,
    HttpModule,
    ReactiveFormsModule,
  	routing 
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
    BooksService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
