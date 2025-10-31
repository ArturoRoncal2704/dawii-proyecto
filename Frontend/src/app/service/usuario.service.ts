import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../model/login-dto';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
<<<<<<< HEAD
import { tap } from 'rxjs/operators'; 
=======
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
>>>>>>> dev

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

<<<<<<< HEAD
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
=======
  private authUrl = 'http://localhost:8080/auth-server/auth'
  private baseUrl= 'http://localhost:8080/user-service/api/usuarios'

  constructor(private http: HttpClient) { }

    login(datos: LoginDTO): Observable<any> {
  return this.http.post(`${this.authUrl}/login`, datos).pipe(
    tap((res: any) => {
      const token = res.access_token;
      const idUsuario = res.idUsuario;
      const nombre = res.nombre;
      const rol = Array.isArray(res.rol) ? res.rol[0] : res.rol;

      localStorage.setItem('token', token);
      localStorage.setItem('idUsuario', idUsuario);
      localStorage.setItem('nombreUsuario', nombre);
      localStorage.setItem('rol', rol);

      console.log('✅ Login exitoso:', { idUsuario, nombre, rol });
>>>>>>> dev
    })
  );
}

<<<<<<< HEAD
  registrar(usuario: Usuario): Observable<any> {
  return this.http.post(`${this.baseUrl}/registrar`, usuario);
=======
  private extraerRolPrincipal(roles: string[]): string {
    if (!roles || roles.length === 0) {
      return 'CLIENTE';
    }

    const esAdmin = roles.some(rol =>
      rol === 'ROLE_ADMIN' ||
      rol === 'ADMIN' ||
      rol.toUpperCase().includes('ADMIN')
    );

    return esAdmin ? 'ADMIN' : 'CLIENTE';
  }

  registrar(usuario: Usuario): Observable<any> {
  return this.http.post(`${this.baseUrl}`, usuario);
>>>>>>> dev
  }

  obtenerPorCorreo(correo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/correo/${correo}`);
  }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

<<<<<<< HEAD
  actualizar(usuario: Usuario): Observable<any> {
  return this.http.put(`${this.baseUrl}`, usuario , { responseType: 'text' });
}

=======
 actualizar(usuario: Usuario): Observable<any> {
  return this.http.put(`${this.baseUrl}/${usuario.idUsuario}`, usuario, { responseType: 'text' });
}
>>>>>>> dev
obtenerPorId(id: number): Observable<Usuario> {
  return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
}

eliminar(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}

}
