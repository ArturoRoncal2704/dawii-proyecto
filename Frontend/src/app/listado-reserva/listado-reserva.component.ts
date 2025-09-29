import { Component, OnInit } from '@angular/core';
import { Reserva } from '../model/reserva';
import { ReservaService } from '../service/reserva.service';


@Component({
  selector: 'app-listado-reserva',
  standalone: false,
  
  templateUrl: './listado-reserva.component.html',
  styleUrl: './listado-reserva.component.css'
})
export class ListadoReservaComponent implements OnInit {

reservas: Reserva[] = [];

mensaje: string = '';
  error: string = '';

enviando = false;         
  mensajeEnvio = '';


  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservaService.getReservas().subscribe({
      next: (data) => this.reservas = data,
      error: (err) => console.error('Error al cargar reservas', err)
    });
  }
  
  eliminarReserva(id: number): void {
  const confirmar = confirm('¿Estás seguro que deseas eliminar esta reserva?');
  if (!confirmar) return;

  this.reservaService.eliminarReserva(id).subscribe({
    next: () => {
      this.mensaje = 'Reserva eliminada correctamente.';
      this.error = '';

      this.reservas = this.reservas.filter(reserva => reserva.idReserva !== id);
    },
    error: (err) => {
      console.error('Error al eliminar reserva', err);

      if (err.status === 409 && typeof err.error === 'string') {
        this.error = err.error; 
      }
      else if (err.status === 409 && err.error?.mensaje) {
        this.error = err.error.mensaje;
      }
      else {
        this.error = 'Error al eliminar la reserva.';
      }

      this.mensaje = '';
    }
  });
}


  enviarReservasARabbit() {
  this.enviando = true;
  this.mensajeEnvio = '';
  this.reservaService.enviarTodasLasReservas().subscribe({
    next: (resp) => {
      this.mensajeEnvio = resp; 
      this.enviando = false;
    },
    error: (err) => {
      console.error('Error enviando a RabbitMQ:', err);
      this.mensajeEnvio = 'Error enviando las reservas a RabbitMQ';
      this.enviando = false;
    }
  });
}


/*
reservas: Reserva[] = [];
  mensaje: string = '';
  error: string = '';

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservaService.getReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        this.error = '';
      },
      error: (err) => {
        console.error('Error al cargar reservas', err);
        this.error = 'No se pudo cargar la lista de reservas.';
      }
    });
  }

  eliminarReserva(id: number): void {
    const confirmar = confirm('¿Estás seguro que deseas eliminar esta reserva?');
    if (!confirmar) return;

    this.reservaService.eliminarReserva(id).subscribe({
      next: () => {
        this.mensaje = 'Reserva eliminada correctamente.';
        this.error = '';

        //  Elimina la reserva directamente del array
        this.reservas = this.reservas.filter(reserva => reserva.idReserva !== id);
      },
      error: (err) => {
        console.error('Error al eliminar reserva', err);
        this.error = 'Error al eliminar la reserva.';
        this.mensaje = '';
      }
    });
  }
  */

}


