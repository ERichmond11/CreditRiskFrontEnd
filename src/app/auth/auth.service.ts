import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly TOKEN_KEY = 'jwt_token';

  constructor(private api: ApiService) {}

  login(email: string, password: string) {
    return this.api
      .post<{ token: string }>('/auth/login', { email, password })
      .pipe(
        tap(res => localStorage.setItem(this.TOKEN_KEY, res.token))
      );
  }

  register(name: string, email: string, password: string) {
    return this.api
      .post<{ token: string }>('/auth/register', { name, email, password })
      .pipe(
        tap(res => localStorage.setItem(this.TOKEN_KEY, res.token))
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}


