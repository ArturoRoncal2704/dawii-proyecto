import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesa } from '../model/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

<<<<<<< HEAD
  private baseUrl=  'http://localhost:8080/api/mesa';

  constructor(private http: HttpClient) {}



  listarMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.baseUrl);
  }
  
  getMesasDisponibles(): Observable<Mesa[]> {
  return this.http.get<Mesa[]>(`${this.baseUrl}/disponibles`);
  }

  registrarMesa(mesa: Mesa): Observable<any> {
  return this.http.post(this.baseUrl, mesa, { responseType: 'text' });
  }

  obtenerMesa(id: number): Observable<Mesa> {
  return this.http.get<Mesa>(`${this.baseUrl}/${id}`);
  }

  actualizarMesa(mesa: Mesa): Observable<any> {
  return this.http.put(this.baseUrl, mesa, {responseType: 'text'} );
  }

  eliminarMesa(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}

=======
  private baseUrl = 'http://localhost:8080/mesa-service/api/mesas';

  constructor(private http: HttpClient) {}

  listarMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.baseUrl);
  }

  getMesasDisponibles(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.baseUrl}/disponibles`);
  }

  registrarMesa(mesa: Mesa): Observable<any> {
    return this.http.post(this.baseUrl, mesa, { responseType: 'text' });
  }

  obtenerMesa(id: number): Observable<Mesa> {
    return this.http.get<Mesa>(`${this.baseUrl}/${id}`);
  }

  actualizarMesa(mesa: Mesa): Observable<any> {
    return this.http.put(`${this.baseUrl}/${mesa.idMesa}`, mesa, { responseType: 'text' });
  }

  eliminarMesa(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
>>>>>>> dev

}
