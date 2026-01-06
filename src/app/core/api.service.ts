import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly BASE_URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get<T>(path: string) {
    return this.http.get<T>(`${this.BASE_URL}${path}`);
  }

  post<T>(path: string, body: any) {
    return this.http.post<T>(`${this.BASE_URL}${path}`, body);
  }
}







