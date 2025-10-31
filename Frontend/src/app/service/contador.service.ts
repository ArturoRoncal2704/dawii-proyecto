import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContadorService {

<<<<<<< HEAD
  private apiUrl = 'http://localhost:8080/api/contador'
=======
  private apiUrl = 'http://localhost:8080/reserva-service/api/contador';
>>>>>>> dev

  constructor(private http: HttpClient) {}

  getTotales(): Observable<{ reservas: number; usuarios: number; mesasDisponibles: number }> {
    return this.http.get<{ reservas: number; usuarios: number; mesasDisponibles: number }>(
      `${this.apiUrl}/totales`
    );
  }
}
