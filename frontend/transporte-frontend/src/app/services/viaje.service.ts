import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Viaje } from '../models/viaje.model';

@Injectable({
  providedIn: 'root'
})
export class ViajeService extends BaseService<Viaje> {
  constructor(protected override http: HttpClient) {
    super(http, 'viajes');
  }
}
