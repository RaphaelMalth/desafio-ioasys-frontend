import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic ' +
      btoa(environment.OAUTH_CLIENT + ':' + environment.OAUTH_SECRET),
    observe: 'response',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl = '';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(loginData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('email', loginData.email)
      .set('password', loginData.password)
      .set('grant_type', 'password');

    return this.http
      .post<any>(environment.API_URL + 'auth/sign-in', body, HTTP_OPTIONS)
      .pipe(
        tap((res: HttpResponse<any>) => {
          // this.tokenService.saveToken(res.headers.get('authorization'));
          // this.tokenService.saveRefreshToken(res.headers.get('refresh-token'));
        }),
        catchError(AuthService.handleError)
      );
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http
      .post<any>(
        environment.API_URL + '/auth/refresh-token',
        body,
        HTTP_OPTIONS
      )
      .pipe(
        tap((res) => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('user')) as User;
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
