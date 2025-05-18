import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService extends BaseService<Factura> {
  constructor(protected override http: HttpClient) {
    super(http, 'facturas');
  }
}
