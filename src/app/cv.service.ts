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
}
