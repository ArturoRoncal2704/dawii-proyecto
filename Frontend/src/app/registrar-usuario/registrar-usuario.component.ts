import { Component } from '@angular/core';
<<<<<<< HEAD
import { Rol, Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
=======
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
>>>>>>> dev

@Component({
  selector: 'app-registrar-usuario',
  standalone: false,
<<<<<<< HEAD
  
=======
>>>>>>> dev
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {

<<<<<<< HEAD
usuario: Usuario = new Usuario();
  mensaje: string = '';
  error: string = '';

  roles = Object.values(Rol);

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  /*registrar() {
    this.usuarioService.registrar(this.usuario).subscribe({
      next: (res) => {
        this.mensaje = 'Usuario registrado correctamente.';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error || 'Error al registrar usuario';
        this.mensaje = '';
      }
    });
  }*/

   registrar() {
  this.usuarioService.registrar(this.usuario).subscribe({
    next: (res) => {
      this.mensaje = 'Usuario registrado correctamente.';
      this.error = '';

      setTimeout(() => this.router.navigate(['/login']), 1000);
    },
    error: (err) => {
      console.error(err);
      if (typeof err.error === 'string') {
        this.error = err.error;
      } else {
        this.error = 'Error al registrar usuario';
      }
      this.mensaje = '';
    }
  }); 
}

=======
  usuario: any = {
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    rol: 'CLIENTE'
  };

  roles: string[] = ['ADMIN', 'CLIENTE'];

  mensaje: string = '';
  mensajeError: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  registrar(): void {
    this.mensaje = '';
    this.mensajeError = '';

    if (!this.usuario.nombre || !this.usuario.correo || !this.usuario.contrasena || !this.usuario.telefono || !this.usuario.rol) {
      this.mensajeError = 'Todos los campos son obligatorios';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.usuario.correo)) {
      this.mensajeError = 'Correo electrónico inválido';
      return;
    }

    console.log('Enviando datos:', this.usuario);

    this.usuarioService.registrar(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario registrado exitosamente:', response);
        this.mensaje = 'Usuario registrado exitosamente';

        this.usuario = {
          nombre: '',
          correo: '',
          contrasena: '',
          telefono: '',
          rol: 'CLIENTE'
        };

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);

        if (err.status === 400) {
          this.mensajeError = err.error?.message || err.error || 'Datos inválidos';
        } else if (err.status === 409) {
          this.mensajeError = 'El correo ya está registrado';
        } else if (err.status === 0) {
          this.mensajeError = 'Error de conexión con el servidor';
        } else {
          this.mensajeError = 'Error al registrar usuario. Intenta nuevamente.';
        }
      }
    });
  }
>>>>>>> dev
}
