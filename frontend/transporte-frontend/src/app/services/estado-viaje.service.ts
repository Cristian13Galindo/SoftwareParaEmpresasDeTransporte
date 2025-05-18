import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { EstadoViaje } from '../models/estado-viaje.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoViajeService extends BaseService<EstadoViaje> {
  constructor(protected override http: HttpClient) {
    super(http, 'estadoviajes');
  }
}
