import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../model/reserva';
import { ReservaService } from '../service/reserva.service';
import { Mesa } from '../model/mesa';
import { MesaService } from '../service/mesa.service';
<<<<<<< HEAD
/*import { ActivatedRoute } from '@angular/router';*/
=======
import { Rol } from '../model/rol';
>>>>>>> dev

@Component({
  selector: 'app-actualizar-reserva',
  standalone: false,
<<<<<<< HEAD
  
=======

>>>>>>> dev
  templateUrl: './actualizar-reserva.component.html',
  styleUrl: './actualizar-reserva.component.css'
})
export class ActualizarReservaComponent {

  reserva: Reserva = {
    idReserva: 0,
    fecha: '',
    hora: '',
    numeroPersonas: 0,
    usuario: {
      idUsuario: 0,
      nombre: '',
      correo: '',
      contrasena: '',
<<<<<<< HEAD
      telefono: ''
=======
      telefono: '',
      roles: []
>>>>>>> dev
    },
    mesa: {
      idMesa: 0,
      numero: 0,
      capacidad: 0,
      ubicacion: '',
      estadoMesa: {
        idEstMesa: 0,
        descripcion: ''
      }
    }
  };

  mesasDisponibles: Mesa[] = [];
  mensaje: string = '';
  error: string = '';

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private mesaService: MesaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.reservaService.getReservaPorId(id).subscribe({
      next: (data) => this.reserva = data,
      error: () => this.error = 'No se pudo cargar la reserva.'
    });

    this.mesaService.getMesasDisponibles().subscribe({
      next: (data) => this.mesasDisponibles = data,
      error: () => this.error = 'Error al cargar mesas disponibles.'
    });
  }

  actualizarReserva() {

    if (this.reserva.hora && this.reserva.hora.length === 5) {
    this.reserva.hora += ':00';
  }
    this.reservaService.actualizarReserva(this.reserva).subscribe({
      next: () => {
        this.mensaje = 'Reserva actualizada correctamente.';
        this.error = '';
        setTimeout(() => this.router.navigate(['/listado-reserva']), 2000);
      },
      error: (err) => {
        this.error = err.error || 'Error al actualizar reserva.';
        this.mensaje = '';
      }
    });
  }


}
