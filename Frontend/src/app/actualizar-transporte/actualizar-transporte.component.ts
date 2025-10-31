import { Component, OnInit } from '@angular/core';
import { Transporte } from '../model/transporte';
import { TransporteService } from '../service/transporte.service';
import { ActivatedRoute, Router } from '@angular/router';
<<<<<<< HEAD
=======
import { Reserva } from '../model/reserva';
import { ReservaService } from '../service/reserva.service';
>>>>>>> dev

@Component({
  selector: 'app-actualizar-transporte',
  standalone: false,
<<<<<<< HEAD
  
  templateUrl: './actualizar-transporte.component.html',
  styleUrl: './actualizar-transporte.component.css'
})
export class ActualizarTransporteComponent implements OnInit {

=======
  templateUrl: './actualizar-transporte.component.html',
  styleUrl: './actualizar-transporte.component.css',
})
export class ActualizarTransporteComponent implements OnInit {
>>>>>>> dev
  transporte: Transporte = {
    idTransporte: 0,
    direccion: '',
    numeroPasajeros: 0,
<<<<<<< HEAD
    idReserva: 0
  };

  constructor(
    private transporteService: TransporteService,
=======
    reserva: { idReserva: 0 } as any,
  };

  reservas: Reserva[] = [];

  constructor(
    private transporteService: TransporteService,
    private reservaService: ReservaService, // ✅ agregado
>>>>>>> dev
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
<<<<<<< HEAD
    this.transporteService.obtenerTransporte(id).subscribe({
      next: (data) => this.transporte = data,
      error: () => alert('No se pudo cargar el transporte.')
=======

    // Cargar transporte existente
    this.transporteService.obtenerTransporte(id).subscribe({
      next: (data) => (this.transporte = data),
      error: () => alert('No se pudo cargar el transporte.'),
    });

    // Cargar reservas disponibles
    this.reservaService.getReservas().subscribe({
      next: (data) => (this.reservas = data),
      error: () => alert('Error al cargar las reservas.'),
>>>>>>> dev
    });
  }

  actualizar(): void {
    this.transporteService.actualizarTransporte(this.transporte).subscribe({
      next: () => {
        alert('Transporte actualizado correctamente');
        this.router.navigate(['/home/transportes']);
      },
<<<<<<< HEAD
      error: () => alert('Error al actualizar transporte')
    });
  }

=======
      error: () => alert('Error al actualizar transporte'),
    });
  }
>>>>>>> dev
}
