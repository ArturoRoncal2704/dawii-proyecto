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

 correo = '';
  contrasena = '';
  error = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}
  /*

  login() {
    const datos: LoginDTO= {
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.usuarioService.login(datos).subscribe({
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
        this.error = 'Correo o contraseña incorrectos';
      }
    });
  }

}
