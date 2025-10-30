import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContadorService {

  private apiUrl = 'http://localhost:8080/reserva-service/api/contador';

  constructor(private http: HttpClient) {}

  getTotales(): Observable<{ reservas: number; usuarios: number; mesasDisponibles: number }> {
    return this.http.get<{ reservas: number; usuarios: number; mesasDisponibles: number }>(
      `${this.apiUrl}/totales`
    );
  }
}
