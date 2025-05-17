import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Método para verificar los endpoints disponibles
  getApiStatus(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/status/`);
  }

  // Método para probar la autenticación
  testAuth(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login/`, { username, password });
  }
}