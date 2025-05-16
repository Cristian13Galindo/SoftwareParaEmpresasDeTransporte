import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends BaseService<Empresa> {
  constructor(http: HttpClient) {
    super(http, 'empresas');
  }
}