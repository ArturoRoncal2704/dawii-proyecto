import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';


@Component({
  selector: 'app-listar-usuarios',
  standalone: false,
  
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit {

usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al listar usuarios:', err);
      }
    });
  }


  eliminar(id: number): void {
  if (confirm('¿Seguro que deseas eliminar este usuario?')) {
    this.usuarioService.eliminar(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.idUsuario !== id);
    });
  }
}
}
