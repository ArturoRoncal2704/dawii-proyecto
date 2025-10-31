import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from '../model/login-dto';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})  
export class LoginComponent {

<<<<<<< HEAD
 correo = '';
=======
  correo = '';
>>>>>>> dev
  contrasena = '';
  error = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}
<<<<<<< HEAD
  /*

  login() {
    const datos: LoginDTO= {
=======

  login() {
    const datos: LoginDTO = {
>>>>>>> dev
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.usuarioService.login(datos).subscribe({
<<<<<<< HEAD
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']); 
      },
      error: () => {
        this.error = 'Correo o contraseña incorrectos';
      }
    });
  }*/

    login() {
    const datos: LoginDTO= {
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.usuarioService.login(datos).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
         localStorage.setItem('rol', res.rol);
         localStorage.setItem('idUsuario', res.idUsuario);          

      if (res.rol === 'ADMIN') {
        this.router.navigate(['/home']);
      } else if (res.rol === 'CLIENTE') {
        this.router.navigate(['/cliente']); 
      } 
      },
      error: () => {
=======
      next: () => {
        // ✅ El token, rol y nombre ya se guardaron en localStorage dentro del servicio
        // Solo necesitas leer el rol para redirigir
        const rol = localStorage.getItem('rol');

        if (rol === 'ADMIN') {
          this.router.navigate(['/home']);
        } else if (rol === 'CLIENTE') {
          this.router.navigate(['/cliente']); 
        } else {
          // Por si acaso no hay rol
          this.router.navigate(['/cliente']); 
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
>>>>>>> dev
        this.error = 'Correo o contraseña incorrectos';
      }
    });
  }
<<<<<<< HEAD

}
=======
}
>>>>>>> dev
