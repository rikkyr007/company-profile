import {Injectable}                         from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable }                       from 'rxjs';

import { map }                              from 'rxjs/operators';
import { environment }                      from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  image_url       = environment.image_url
  file_url        = environment.file_url

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File, path, Type): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('url', path);

    let tipe_url = null

    if(Type == 'file') {
      tipe_url = this.file_url
    } else {
      tipe_url = this.image_url
    }
 
    const req = new HttpRequest('POST', tipe_url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    
    return this.http.request(req)
                        .pipe(map(data => data));
  }
 
  getFile(): Observable<any> {
    return this.http.get(this.file_url)
  }
  getImage(): Observable<any> {
    return this.http.get(this.image_url)
  }
}
