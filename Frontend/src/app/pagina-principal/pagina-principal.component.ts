import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-pagina-principal',
  standalone: false,
  
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {


  nombreUsuario: string = '';
  
   constructor(
    private usuarioService: UsuarioService,
    private router: Router) {}


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';
}

  
}
