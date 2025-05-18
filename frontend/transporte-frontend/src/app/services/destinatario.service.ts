import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { DestinatarioFinal } from '../models/destinatario.model';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService extends BaseService<DestinatarioFinal> {
  constructor(protected override http: HttpClient) {
    super(http);
    this.initializeApiUrl();
  }
  
  protected getEndpoint(): string {
    return 'destinatariofinales';
  }
}
