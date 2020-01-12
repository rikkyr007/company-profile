// Core
import { Injectable }                           from '@angular/core';
import { HttpClient, HttpParams }  from '@angular/common/http';

// RxJs Dependency
import { Observable, throwError }                           from 'rxjs';
import { catchError }                           from 'rxjs/operators';


@Injectable()
export class XRequestService {

  constructor(private _http : HttpClient) { }

  errorHandler(error: any){
    return throwError(error.error);
  }

  get(path: String, params: HttpParams = new HttpParams()): Observable<any>{
    return this._http.get(`${path}`, { params })
              .pipe(catchError(this.errorHandler));
  }

  post(path: String, body: Object = {}): Observable<any>{
    return this._http.post(`${path}`, body)
              .pipe(catchError(this.errorHandler));
  }

  put(path: String, body: Object = {}): Observable<any>{
    return this._http.put(`${path}`, body)
              .pipe(catchError(this.errorHandler));
  }

  delete(path): Observable<any>{
    return this._http.delete(`${path}`)
              .pipe(catchError(this.errorHandler));
  }
}
