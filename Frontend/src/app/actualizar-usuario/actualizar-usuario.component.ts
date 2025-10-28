import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { Usuario, Rol } from '../model/usuario';

@Component({
  selector: 'app-actualizar-usuario',
  standalone: false,
  
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css'
})
export class ActualizarUsuarioComponent implements OnInit{

  usuario: Usuario = new Usuario();
  mensaje: string = '';
  error: string = '';
  roles = Object.values(Rol); // ["ADMIN", "CLIENTE"]

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.obtenerPorId(+id).subscribe({
        next: (data) => this.usuario = data,
        error: () => this.error = 'No se pudo cargar el usuario.'
      });
    }
  }

  actualizar(): void {
    this.usuarioService.actualizar(this.usuario).subscribe({
      next: () => {
        this.mensaje = 'Usuario actualizado correctamente.';
        this.error = '';
        setTimeout(() => this.router.navigate(['/home/usuarios']), 1500);
      },
      error: () => {
        this.error = 'Error al actualizar el usuario.';
        this.mensaje = '';
      }
    });
  }

}
