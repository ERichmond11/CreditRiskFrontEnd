import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private readonly BASE_URL = 'http://localhost:8080';
  private readonly TOKEN_KEY = 'jwt_token'; // 🔥 MUST match AuthService

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.TOKEN_KEY);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(
      this.BASE_URL + path,
      { headers: this.authHeaders() }
    );
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(
      this.BASE_URL + path,
      body,
      { headers: this.authHeaders() }
    );
  }
}



