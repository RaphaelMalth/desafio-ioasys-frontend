import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { BooksDTO } from '../models/books-dto';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {}

  getBooks(page: string, amount = '10', category: string): Observable<BooksDTO> {
    return this.http
      .get<BooksDTO>(environment.API_URL + `books?page=${page}&amount=${amount}&category=${category}`)
      .pipe(catchError(BooksService.handleError)) as Observable<BooksDTO>;
  }

  getBookById(book: Book): Observable<Book> {
    return this.http
      .get<Book>(environment.API_URL + `books/${book.id}`)
      .pipe(catchError(BooksService.handleError)) as Observable<Book>;
  }

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
