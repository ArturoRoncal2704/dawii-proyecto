import { Component, OnInit } from '@angular/core';
import { Mesa } from '../model/mesa';
import { EstadoMesa } from '../model/estado-mesa';
import { ActivatedRoute, Router } from '@angular/router';
import { MesaService } from '../service/mesa.service';
import { EstadoMesaService } from '../service/estado-mesa.service';

@Component({
  selector: 'app-actualizar-mesa',
  standalone: false,
  
  templateUrl: './actualizar-mesa.component.html',
  styleUrl: './actualizar-mesa.component.css'
})
export class ActualizarMesaComponent implements OnInit {


  mesa: Mesa = {
    idMesa: 0,
    numero: 0,
    capacidad: 0,
    ubicacion: '',
    estadoMesa: { idEstMesa: 0, descripcion: '' }
  };
  estados: EstadoMesa [] = [];

  constructor(
    private route: ActivatedRoute,
    private mesaService: MesaService,
    private estadoMesaService: EstadoMesaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.mesaService.obtenerMesa(id).subscribe({
      next: data => this.mesa = data,
      error: () => alert('Error al cargar la mesa')
    });

    this.estadoMesaService.listarEstados().subscribe({
      next: data => this.estados = data,
      error: () => alert('Error al cargar estados')
    });
  }

  actualizar(): void {
    this.mesaService.actualizarMesa(this.mesa).subscribe({
      next: () => {
        alert('Mesa actualizada con éxito');
        this.router.navigate(['/home/mesas']);
      },
      error: () => alert('Error al actualizar la mesa')
    });
  }
}
