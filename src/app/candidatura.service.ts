import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {

  constructor(private http: HttpClient) { }

  apuntarse(body: any) {
    return this.http.post('http://127.0.0.1:3000/candidaturas/apuntarse', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  candidaturas() {
    return this.http.get('http://127.0.0.1:3000/candidaturas/candidaturas/', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  aceptarCandidaturas(body: any) {
    console.log(body);
    return this.http.post('http://127.0.0.1:3000/candidaturas/aceptarCandidatura', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
