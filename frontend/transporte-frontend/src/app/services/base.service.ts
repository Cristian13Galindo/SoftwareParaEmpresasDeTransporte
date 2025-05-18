import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  protected apiUrl: string;
  
  constructor(
    protected http: HttpClient
  ) {
    // La URL base se construirá en las clases hijas
  }

  // Método a implementar en las clases hijas para obtener el endpoint
  protected abstract getEndpoint(): string;

  // Inicializar la URL de la API
  protected initializeApiUrl(): void {
    this.apiUrl = `${environment.apiUrl}/${this.getEndpoint()}`;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
