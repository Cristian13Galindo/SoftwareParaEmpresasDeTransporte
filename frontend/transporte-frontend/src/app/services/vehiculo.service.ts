import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService extends BaseService<Vehiculo> {
  constructor(http: HttpClient) {
    super(http, 'vehiculos');
  }

  getByEmpresa(empresaId: number): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/empresa/${empresaId}`)
      .pipe(catchError(this.handleError));
  }
}