import { Component, OnInit } from '@angular/core';
import { Mesa } from '../model/mesa';
import { ReservaService } from '../service/reserva.service';
import { MesaService } from '../service/mesa.service';

@Component({
  selector: 'app-registrar-reserva',
  standalone: false,
  
  templateUrl: './registrar-reserva.component.html',
  styleUrl: './registrar-reserva.component.css'
})
export class RegistrarReservaComponent implements OnInit {

  reserva = {
    fecha: '',
    hora: '',
    numeroPersonas: 1,
    usuario: {
      idUsuario: 0
    },
    mesa: {
      idMesa: 0
    }
  };

  mesas: Mesa[] = [];

  constructor(
    private reservaService: ReservaService,
    private mesaService: MesaService
  ) {}

  ngOnInit(): void {
    this.cargarMesas();

    const idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario) {
      this.reserva.usuario.idUsuario = Number(idUsuario);
    } else {
      alert('Debe iniciar sesión para registrar una reserva.');
    }
  }

  cargarMesas(): void {
    this.mesaService.getMesasDisponibles().subscribe({
      next: (data) => this.mesas = data,
      error: () => alert('Error al cargar mesas')
    });
  }
 
  /*
  registrar(): void {
    const idUsuario = localStorage.getItem('idUsuario');
    if (!idUsuario) {
      alert('Debe iniciar sesión para registrar una reserva');
      return;
    }
    this.reserva.usuario.idUsuario = Number(idUsuario);
    this.reservaService.registrarReserva(this.reserva).subscribe({
      next: () => {

        alert('Reserva registrada con éxito');

        this.reserva = {
          fecha: '',
          hora: '',
          numeroPersonas: 0,
          usuario: { idUsuario: Number(idUsuario) },
          mesa: { idMesa: 0 }
        };
      },
      error: () => alert('Error al registrar la reserva')
    });
  }
  */


  registrar(): void {
  const idUsuario = localStorage.getItem('idUsuario');
  if (!idUsuario) {
    alert('Debe iniciar sesión para registrar una reserva');
    return;
  }

  this.reserva.usuario.idUsuario = Number(idUsuario);

  this.reservaService.registrarReserva(this.reserva).subscribe({
    next: (respuesta) => {
      // Extrae el ID de la respuesta del backend
      const idReservaMatch = /ID: (\d+)/.exec(respuesta);
      if (idReservaMatch) {
        const idReserva = Number(idReservaMatch[1]);
        localStorage.setItem('idReserva', idReserva.toString()); // 👈 Guardamos idReserva
      }

      alert('Reserva registrada con éxito');

      this.reserva = {
        fecha: '',
        hora: '',
        numeroPersonas: 0,
        usuario: { idUsuario: Number(idUsuario) },
        mesa: { idMesa: 0 }
      };
    },
    error: () => alert('Error al registrar la reserva')
  });

}
}
