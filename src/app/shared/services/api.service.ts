import { Injectable }                           from '@angular/core';
import { HttpClient, HttpParams }               from '@angular/common/http';

// Environtment
import { environment }                          from '../../../environments/environment';

// RxJs Dependency
import { Observable, throwError }               from 'rxjs';
import { catchError }                           from 'rxjs/operators';


@Injectable()
export class ApiService {

  constructor(private _http : HttpClient) { }

  errorHandler(error: any){
    return throwError(error.error);
  }

  get(path: String, params: HttpParams = new HttpParams()): Observable<any>{
    return this._http.get(`${environment.api_url}${path}`, { params })
              .pipe(catchError(this.errorHandler));
  }

  post(path: String, body: Object = {}): Observable<any>{
    return this._http.post(`${environment.api_url}${path}`, body)
              .pipe(catchError(this.errorHandler));
  }

  put(path: String, body: Object = {}): Observable<any>{
    return this._http.put(`${environment.api_url}${path}`, body)
              .pipe(catchError(this.errorHandler));
  }

  delete(path): Observable<any>{
    return this._http.delete(`${environment.api_url}${path}`)
              .pipe(catchError(this.errorHandler));
  }
}
