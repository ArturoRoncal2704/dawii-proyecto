import { Component, OnInit } from '@angular/core';
import { Transporte } from '../model/transporte';
import { TransporteService } from '../service/transporte.service';
import { Router } from '@angular/router';
import { ReservaService } from '../service/reserva.service';
import { Reserva } from '../model/reserva';

@Component({
  selector: 'app-registrar-transporte',
  standalone: false,
<<<<<<< HEAD
  
=======
>>>>>>> dev
  templateUrl: './registrar-transporte.component.html',
  styleUrl: './registrar-transporte.component.css'
})
export class RegistrarTransporteComponent implements OnInit {

<<<<<<< HEAD
    transporte: Transporte = {
    direccion: '',
    numeroPasajeros: 1,
    idReserva: 0
=======
  transporte: Transporte = {
    direccion: '',
    numeroPasajeros: 1,
    reserva: { idReserva: 0 } as any

>>>>>>> dev
  };

  constructor(
    private transporteService: TransporteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idReserva = localStorage.getItem('idReserva');
    if (idReserva) {
<<<<<<< HEAD
      this.transporte.idReserva = Number(idReserva);
=======
      this.transporte.reserva = { idReserva: Number(idReserva) };
>>>>>>> dev
    } else {
      alert('Primero debe registrar una reserva');
      this.router.navigate(['/cliente/registrar-reserva']);
    }
  }

  registrarTransporte(): void {
    this.transporteService.registrarTransporte(this.transporte).subscribe({
      next: () => {
        alert('Transporte registrado con éxito');
<<<<<<< HEAD
        localStorage.removeItem('idReserva'); 
=======
        localStorage.removeItem('idReserva');
>>>>>>> dev
        this.router.navigate(['/cliente']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar transporte: ' + err.error);
      }
    });
  }

<<<<<<< HEAD

    
   
}


=======
  logout(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      localStorage.clear();
      console.log('🚪 Sesión cerrada');
      this.router.navigate(['/login']);
    }
  }
}
>>>>>>> dev
