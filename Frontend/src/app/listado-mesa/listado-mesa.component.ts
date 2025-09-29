import { Component, OnInit } from '@angular/core';
import { Mesa } from '../model/mesa';
import { MesaService } from '../service/mesa.service';

@Component({
  selector: 'app-listado-mesa',
  standalone: false,
  
  templateUrl: './listado-mesa.component.html',
  styleUrl: './listado-mesa.component.css'
})
export class ListadoMesaComponent implements OnInit {


  mesas: Mesa[] = [];

  constructor(private mesaService: MesaService) {}

  ngOnInit(): void {
    this.cargarMesas();
  }

  cargarMesas(): void {
    this.mesaService.listarMesas().subscribe({
      next: (data) => this.mesas = data,
      error: (err) => console.error('Error al listar mesas:', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta mesa?')) {
      this.mesaService.eliminarMesa(id).subscribe({
        next: () => {
          alert('Mesa eliminada correctamente');
          this.cargarMesas(); // Recarga el listado
        },
        error: () => {
          alert('Error al eliminar la mesa');
        }
      });
    }
  }
}
