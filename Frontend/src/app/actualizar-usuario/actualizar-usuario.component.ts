import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
<<<<<<< HEAD
import { Usuario, Rol } from '../model/usuario';
=======
import { Usuario } from '../model/usuario';
import { Rol } from '../model/rol'; // 👈 importar modelo real
import { RolService } from '../service/rol.service'; // 👈 nuevo servicio para listar roles
>>>>>>> dev

@Component({
  selector: 'app-actualizar-usuario',
  standalone: false,
<<<<<<< HEAD
  
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css'
})
export class ActualizarUsuarioComponent implements OnInit{
=======
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css'
})
export class ActualizarUsuarioComponent implements OnInit {
>>>>>>> dev

  usuario: Usuario = new Usuario();
  mensaje: string = '';
  error: string = '';
<<<<<<< HEAD
  roles = Object.values(Rol); // ["ADMIN", "CLIENTE"]

  constructor(
    private usuarioService: UsuarioService,
=======
  roles: Rol[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
>>>>>>> dev
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
<<<<<<< HEAD
  }

  actualizar(): void {
=======

    this.rolService.listarRoles().subscribe({
      next: (data) => this.roles = data,
      error: () => this.error = 'No se pudieron cargar los roles.'
    });
  }

  actualizar(): void {
    console.log('Usuario actualizado:', this.usuario);

>>>>>>> dev
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
<<<<<<< HEAD

=======
>>>>>>> dev
}
