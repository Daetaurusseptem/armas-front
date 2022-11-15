import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  urlFileServer = 'http://localhost:8080/'
  constructor(private http: HttpClient) {}

  download(url: string): Observable<Blob> {
    return this.http.get(`${this.urlFileServer}${url}`, {
      responseType: 'blob',
      headers:{
        'Access-Control-Allow-Origin':'*'
      }
    })
  }
}
