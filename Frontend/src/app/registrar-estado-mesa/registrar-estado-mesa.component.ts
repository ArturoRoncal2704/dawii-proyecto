import { Component } from '@angular/core';
import { EstadoMesa } from '../model/estado-mesa';
import { EstadoMesaService } from '../service/estado-mesa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-estado-mesa',
  standalone: false,
  
  templateUrl: './registrar-estado-mesa.component.html',
  styleUrl: './registrar-estado-mesa.component.css'
})
export class RegistrarEstadoMesaComponent {

  
  estadoMesa: EstadoMesa = {
    descripcion: ''
  };

  constructor(
    private estadoMesaService: EstadoMesaService,
    private router: Router
  ) {}

  registrar(): void {
    this.estadoMesaService.registrarEstado(this.estadoMesa).subscribe({
      next: () => {
        alert('Estado registrado con éxito');
        this.router.navigate(['/home/estado-mesa']);
      },
      error: () => {
        alert('Error al registrar estado');
      }
    });
  }

}
