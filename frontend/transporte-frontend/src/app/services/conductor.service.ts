import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Conductor } from "../models/conductor.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ConductorService {
  private apiUrl = `${environment.apiUrl}/conductores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Conductor[]> {
    return this.http.get<Conductor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Conductor> {
    return this.http.get<Conductor>(`${this.apiUrl}/${id}`);
  }

  create(conductor: Conductor): Observable<Conductor> {
    return this.http.post<Conductor>(this.apiUrl, conductor);
  }

  update(id: number, conductor: Conductor): Observable<Conductor> {
    return this.http.put<Conductor>(`${this.apiUrl}/${id}`, conductor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
