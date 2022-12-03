import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const urlFileServer = environment.urlFileServer
@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) {}

  download(url: string): Observable<Blob> {
    console.log(`${urlFileServer}${url}`);
    return this.http.get(`${urlFileServer}${url}`, {
      responseType: 'blob',
      headers:{
        'Access-Control-Allow-Origin':'*'
      }
    })
  }
}
