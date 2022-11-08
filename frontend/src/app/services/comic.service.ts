import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Comic {
   //aqui habia id number
  comic: string;
  autor: string;

}

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  endpoint = 'http://localhost:8080/api/comics1';//aqui modifique comics a comics1

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  createComic(comic: Comic): Observable<any> {
    return this.httpClient
      .post<Comic>(this.endpoint, JSON.stringify(comic), this.httpOptions)
      .pipe(catchError(this.handleError<Comic>('Error occured')));
  }

  // getPiloto(id): Observable<Piloto[]> {
  //   return this.httpClient.get<Piloto[]>(this.endpoint + '/' + id).pipe(
  //     tap((_) => console.log(`Piloto fetched: ${id}`)),
  //     catchError(this.handleError<Piloto[]>(`Get piloto id=${id}`))
  //   );
  // }
  getComic(id) {
    return this.httpClient.get<Comic[]>(this.endpoint + '/' + id).pipe(
      tap((_) => console.log(`Comic fetched: ${id}`)),
      catchError(this.handleError<Comic[]>(`Get comic id=${id}`))
    );
  }

  getComics(): Observable<Comic[]> {
    return this.httpClient.get<Comic[]>(this.endpoint).pipe(
      tap((users) => console.log('comic retrieved!')),
      catchError(this.handleError<Comic[]>('Get comic', []))
    );
  }

  updateComic(id, comic: Comic): Observable<any> {
    return this.httpClient
      .put(this.endpoint + '/' + id, JSON.stringify(comic), this.httpOptions)
      .pipe(
        tap((_) => console.log(`Comic updated: ${id}`)),
        catchError(this.handleError<Comic[]>('Update comic'))
      );
  }

  // deletePiloto(id): Observable<Piloto[]> {
  //   return this.httpClient
  //     .delete<Piloto[]>(this.endpoint + '/' + id, this.httpOptions)
  //     .pipe(
  //       tap((_) => console.log(`Piloto deleted: ${id}`)),
  //       catchError(this.handleError<Piloto[]>('Delete piloto'))
  //     );
  // }

  deleteComic(id) {
    return this.httpClient
      .delete<Comic[]>(this.endpoint + '/' + id, this.httpOptions)
      .pipe(
        tap((_) => console.log(`Comic deleted: ${id}`)),
        catchError(this.handleError<Comic[]>('Delete comic'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
