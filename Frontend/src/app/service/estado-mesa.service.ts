import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoMesa } from '../model/estado-mesa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoMesaService {

  private url = 'http://localhost:8080/api/estadomesa';

  constructor(private http: HttpClient) { }

  listarEstados(): Observable<EstadoMesa[]> {
    return this.http.get<EstadoMesa[]>(this.url);
  }

  registrarEstado(estado: { descripcion: string }): Observable<any> {
  return this.http.post(this.url, estado, { responseType: 'text' });
}

actualizarEstado(estado: EstadoMesa): Observable<any> {
  return this.http.put(this.url, estado, { responseType: 'text' });
}

obtenerEstadoPorId(id: number): Observable<EstadoMesa> {
  return this.http.get<EstadoMesa>(`${this.url}/${id}`);
}

eliminarEstado(id: number): Observable<any> {
  return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
}
}
