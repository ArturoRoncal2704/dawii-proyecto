import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transporte } from '../model/transporte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {

  private baseUrl = 'http://localhost:8081/api/transporte';

  constructor(private http: HttpClient) {}

  getTransportes(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(this.baseUrl);
  }

  obtenerTransporte(id: number): Observable<Transporte> {
    return this.http.get<Transporte>(`${this.baseUrl}/${id}`);
  }

  actualizarTransporte(transporte: Transporte): Observable<any> {
    return this.http.put(this.baseUrl, transporte, { responseType: 'text' });
  }

  eliminarTransporte(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  registrarTransporte(transporte: any): Observable<any> {
  return this.http.post(this.baseUrl , transporte, {responseType:'text'});
  }


}
