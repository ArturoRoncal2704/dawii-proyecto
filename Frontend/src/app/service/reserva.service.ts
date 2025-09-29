import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../model/reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private baseUrl=  'http://localhost:8080/api/reserva';

  constructor(private http: HttpClient) {}

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.baseUrl);
  }

  getReservaPorId(id: number): Observable<Reserva> {
  return this.http.get<Reserva>(`${this.baseUrl}/${id}`);
  }


  actualizarReserva(reserva: Reserva): Observable<string> {
  return this.http.put(this.baseUrl, reserva, { responseType: 'text' });

  }

  registrarReserva(reserva: any): Observable<any> {
  return this.http.post(this.baseUrl , reserva, {responseType:'text' });
  }

  eliminarReserva(id: number): Observable<string> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  enviarTodasLasReservas(): Observable<string> {
  return this.http.post(`${this.baseUrl}/enviar-todas`, null, { responseType: 'text'});
}

}
