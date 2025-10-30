import { Component, OnInit } from '@angular/core';
import { Transporte } from '../model/transporte';
import { TransporteService } from '../service/transporte.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../model/reserva';
import { ReservaService } from '../service/reserva.service';

@Component({
  selector: 'app-actualizar-transporte',
  standalone: false,
  templateUrl: './actualizar-transporte.component.html',
  styleUrl: './actualizar-transporte.component.css',
})
export class ActualizarTransporteComponent implements OnInit {
  transporte: Transporte = {
    idTransporte: 0,
    direccion: '',
    numeroPasajeros: 0,
    reserva: { idReserva: 0 } as any,
  };

  reservas: Reserva[] = [];

  constructor(
    private transporteService: TransporteService,
    private reservaService: ReservaService, // ✅ agregado
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar transporte existente
    this.transporteService.obtenerTransporte(id).subscribe({
      next: (data) => (this.transporte = data),
      error: () => alert('No se pudo cargar el transporte.'),
    });

    // Cargar reservas disponibles
    this.reservaService.getReservas().subscribe({
      next: (data) => (this.reservas = data),
      error: () => alert('Error al cargar las reservas.'),
    });
  }

  actualizar(): void {
    this.transporteService.actualizarTransporte(this.transporte).subscribe({
      next: () => {
        alert('Transporte actualizado correctamente');
        this.router.navigate(['/home/transportes']);
      },
      error: () => alert('Error al actualizar transporte'),
    });
  }
}
