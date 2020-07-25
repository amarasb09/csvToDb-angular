import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get(path: string): Observable<any> {
    let headers = new HttpHeaders();
    return this.http.get(`${environment.api_url}${path}`);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, body);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body);
  }

  delete(path: string, body: Object = {}): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`);
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(`${environment.api_url}${path}`, body);
  }

  postImage(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body, {
      reportProgress: true,
    });
  }
}
