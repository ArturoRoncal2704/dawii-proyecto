import { Component, OnInit } from '@angular/core';
import { Transporte } from '../model/transporte';
import { TransporteService } from '../service/transporte.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-transporte',
  standalone: false,
  
  templateUrl: './actualizar-transporte.component.html',
  styleUrl: './actualizar-transporte.component.css'
})
export class ActualizarTransporteComponent implements OnInit {

  transporte: Transporte = {
    idTransporte: 0,
    direccion: '',
    numeroPasajeros: 0,
    idReserva: 0
  };

  constructor(
    private transporteService: TransporteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.transporteService.obtenerTransporte(id).subscribe({
      next: (data) => this.transporte = data,
      error: () => alert('No se pudo cargar el transporte.')
    });
  }

  actualizar(): void {
    this.transporteService.actualizarTransporte(this.transporte).subscribe({
      next: () => {
        alert('Transporte actualizado correctamente');
        this.router.navigate(['/home/transportes']);
      },
      error: () => alert('Error al actualizar transporte')
    });
  }

}
