import { Component, Inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../shared/movie';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class RestApi {

  apiURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiURL = baseUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  GetMovies(): Observable<Movie> {
    return this.http.get<Movie>(this.apiURL + 'api/MovieData').pipe(retry(1), catchError(this.handleError))
  }


  GetMoviesById(id): Observable<Movie> {
    return this.http.get<Movie>(this.apiURL + 'api/MovieData/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  AddMovie(Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiURL + 'api/MovieData/', JSON.stringify(Movie), this.httpOptions)
      .pipe(retry(1),
        catchError(this.handleError)
    )
  }

  EditMovie(id, Movie): Observable<Movie> {
    return this.http.put<Movie>(this.apiURL + 'api/MovieData/' + id, JSON.stringify(Movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  DeleteMovie(id) {
    return this.http.delete<Movie>(this.apiURL + 'api/MovieData/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }





  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
