import { Component } from '@angular/core';
import { Rol, Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  standalone: false,
  
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {

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

}
