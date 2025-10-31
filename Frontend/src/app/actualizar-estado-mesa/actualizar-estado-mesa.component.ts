import { Component, OnInit } from '@angular/core';
import { EstadoMesa } from '../model/estado-mesa';
import { EstadoMesaService } from '../service/estado-mesa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-estado-mesa',
  standalone: false,
<<<<<<< HEAD
  
=======
>>>>>>> dev
  templateUrl: './actualizar-estado-mesa.component.html',
  styleUrl: './actualizar-estado-mesa.component.css'
})
export class ActualizarEstadoMesaComponent implements OnInit {

  estadoMesa: EstadoMesa = { idEstMesa: 0, descripcion: '' };

  constructor(
    private estadoMesaService: EstadoMesaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
<<<<<<< HEAD
=======

>>>>>>> dev
    this.estadoMesaService.obtenerEstadoPorId(id).subscribe({
      next: data => this.estadoMesa = data,
      error: err => {
        alert('Error al obtener estado');
        this.router.navigate(['/home/estado-mesa']);
      }
    });
  }

  actualizar(): void {
    if (!this.estadoMesa.descripcion || this.estadoMesa.descripcion.trim() === '') {
      alert('La descripción es obligatoria');
      return;
    }

<<<<<<< HEAD
    this.estadoMesaService.actualizarEstado(this.estadoMesa).subscribe({
=======
    this.estadoMesaService.actualizarEstadoMesa(this.estadoMesa).subscribe({
>>>>>>> dev
      next: () => {
        alert('Estado actualizado con éxito');
        this.router.navigate(['/home/estado-mesa']);
      },
      error: () => {
        alert('Error al actualizar estado');
      }
    });
  }
}
