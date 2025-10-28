import { Component, OnInit } from '@angular/core';
import { EstadoMesa } from '../model/estado-mesa';
import { EstadoMesaService } from '../service/estado-mesa.service';

@Component({
  selector: 'app-listado-estado-mesa',
  standalone: false,
  
  templateUrl: './listado-estado-mesa.component.html',
  styleUrl: './listado-estado-mesa.component.css'
})
export class ListadoEstadoMesaComponent implements OnInit {

  estados: EstadoMesa[] = [];

  constructor(private estadoMesaService: EstadoMesaService) {}

  ngOnInit(): void {
    this.estadoMesaService.listarEstados().subscribe({
      next: (data) => (this.estados = data),
      error: (err) => console.error('Error al cargar estados de mesa', err),
    });
  }

  eliminar(id: number): void {
  if (confirm('¿Estás seguro de que deseas eliminar este estado?')) {
    this.estadoMesaService.eliminarEstado(id).subscribe({
      next: () => {
        alert('Estado eliminado correctamente');
        // Actualizar la lista sin volver a hacer GET completo
        this.estados = this.estados.filter(e => e.idEstMesa !== id);
      },
      error: () => alert('Error al eliminar estado')
    });
  }
}


}
