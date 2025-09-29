import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-cliente',
  standalone: false,
  
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
  

}
