<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> dev
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-cliente',
  standalone: false,
<<<<<<< HEAD
  
  templateUrl: './pagina-cliente.component.html',
  styleUrl: './pagina-cliente.component.css'
})
export class PaginaClienteComponent {
  
     constructor(

      private router: Router) {}
  
  
    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  

=======
  templateUrl: './pagina-cliente.component.html',
  styleUrl: './pagina-cliente.component.css'
})
export class PaginaClienteComponent implements OnInit {

  nombreUsuario: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Cliente';

    console.log('Usuario logueado:', this.nombreUsuario);
  }

  logout(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      localStorage.clear();
      console.log('🚪 Sesión cerrada');
      this.router.navigate(['/login']);
    }
  }
>>>>>>> dev
}
