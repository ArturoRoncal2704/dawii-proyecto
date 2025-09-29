import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../model/login-dto';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl= 'http://localhost:8080/api/usuarios'

  constructor(private http: HttpClient) { }

  /*login(datos: LoginDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, datos);
  }*/


    login(datos: LoginDTO): Observable<any> {
  return this.http.post(`${this.baseUrl}/login`, datos).pipe(
    tap((res: any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('nombreUsuario', res.nombre); 
    })
  );
}

  registrar(usuario: Usuario): Observable<any> {
  return this.http.post(`${this.baseUrl}/registrar`, usuario);
  }

  obtenerPorCorreo(correo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/correo/${correo}`);
  }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  actualizar(usuario: Usuario): Observable<any> {
  return this.http.put(`${this.baseUrl}`, usuario , { responseType: 'text' });
}

obtenerPorId(id: number): Observable<Usuario> {
  return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
}

eliminar(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}

}
