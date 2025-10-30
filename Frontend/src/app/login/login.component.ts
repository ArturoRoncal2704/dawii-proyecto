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

  login() {
    const datos: LoginDTO = {
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.usuarioService.login(datos).subscribe({
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
        this.error = 'Correo o contraseña incorrectos';
      }
    });
  }
}