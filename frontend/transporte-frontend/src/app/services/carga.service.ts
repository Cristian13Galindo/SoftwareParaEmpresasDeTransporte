import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Carga } from '../models/carga.model';

@Injectable({
  providedIn: 'root'
})
export class CargaService extends BaseService<Carga> {
  constructor(protected override http: HttpClient) {
    super(http);
    this.initializeApiUrl();
  }
  
  protected getEndpoint(): string {
    return 'cargas';
  }
}
