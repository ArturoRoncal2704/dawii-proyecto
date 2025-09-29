import { Component, OnInit } from '@angular/core';
import { Mesa } from '../model/mesa';
import { EstadoMesa } from '../model/estado-mesa';
import { MesaService } from '../service/mesa.service';
import { EstadoMesaService } from '../service/estado-mesa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-mesa',
  standalone: false,
  
  templateUrl: './registrar-mesa.component.html',
  styleUrl: './registrar-mesa.component.css'
})
export class RegistrarMesaComponent implements OnInit {

   mesa: Mesa = {
    numero: 0,
    capacidad: 0,
    ubicacion: '',
    estadoMesa: { idEstMesa: 0, descripcion: '' }
  };

  estados: EstadoMesa[] = [];

  constructor(
    private mesaService: MesaService,
    private estadoMesaService: EstadoMesaService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.estadoMesaService.listarEstados().subscribe({
      next: (data) => this.estados = data,
      error: (err) => console.error('Error cargando estados:', err)
    });
  }

  registrar(): void {
  this.mesaService.registrarMesa(this.mesa).subscribe({
    next: () => {
      alert('Mesa registrada con éxito');
      this.router.navigate(['/home/mesas']);
    },
    error: () => alert('Error al registrar mesa')
  });
}


}
