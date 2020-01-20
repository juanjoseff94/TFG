import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private http: HttpClient ) { }

  cv(body: any) {
    return this.http.post('http://127.0.0.1:3000/cvs/cvs', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getCvs() {
    return this.http.get('http://127.0.0.1:3000/cvs/getCvs', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  findCv(body: any) {
    return this.http.post('http://127.0.0.1:3000/cvs/findCv', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
