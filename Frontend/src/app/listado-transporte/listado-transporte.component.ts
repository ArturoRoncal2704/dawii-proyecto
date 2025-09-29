import { Component, OnInit } from '@angular/core';
import { Transporte } from '../model/transporte';
import { TransporteService } from '../service/transporte.service';

@Component({
  selector: 'app-listado-transporte',
  standalone: false,
  
  templateUrl: './listado-transporte.component.html',
  styleUrl: './listado-transporte.component.css'
})
export class ListadoTransporteComponent implements OnInit {

  transportes: Transporte[] = [];
  error: string = '';

  constructor(private transporteService: TransporteService) {}

  ngOnInit(): void {
    this.listarTransportes();
  }

  listarTransportes(): void {
    this.transporteService.getTransportes().subscribe({
      next: data => this.transportes = data,
      error: err => this.error = 'Error al cargar transportes.'
    });
  }

  eliminar(id: number): void {
    if (confirm(`¿Deseas eliminar el transporte con ID ${id}?`)) {
      this.transporteService.eliminarTransporte(id).subscribe({
        next: () => {
          alert('Transporte eliminado correctamente.');
          this.listarTransportes(); 
        },
        error: () => alert('Error al eliminar el transporte.')
      });
    }
  }

}
