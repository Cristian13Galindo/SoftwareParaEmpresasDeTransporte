import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post<any>(`${environment.authUrl}`, credentials)
      .pipe(
        tap(response => {
          if (response?.access) {
            this.tokenService.saveToken(response.access);
            if (response?.refresh) {
              this.tokenService.saveRefreshToken(response.refresh);
            }
          }
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

  isAuthenticated(): boolean {
    return this.tokenService.getToken() !== null;
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.tokenService.getRefreshToken();
    return this.http.post<any>(`${this.apiUrl}/auth/refresh/`, { refresh: refreshToken });
  }
}

