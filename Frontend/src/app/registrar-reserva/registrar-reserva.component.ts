import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Mesa } from '../model/mesa';
=======
import { Router } from '@angular/router';
>>>>>>> dev
import { ReservaService } from '../service/reserva.service';
import { MesaService } from '../service/mesa.service';

@Component({
  selector: 'app-registrar-reserva',
  standalone: false,
<<<<<<< HEAD
  
=======
>>>>>>> dev
  templateUrl: './registrar-reserva.component.html',
  styleUrl: './registrar-reserva.component.css'
})
export class RegistrarReservaComponent implements OnInit {

<<<<<<< HEAD
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
=======
  reserva: any = {
    fecha: '',
    hora: '',
    numeroPersonas: 1,
    mesa: { idMesa: '' },
    usuario: { idUsuario: '' }
  };

  mesas: any[] = [];

  constructor(
    private router: Router,
>>>>>>> dev
    private reservaService: ReservaService,
    private mesaService: MesaService
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
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
=======
    this.cargarMesasDisponibles();

    const idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario) {
      this.reserva.usuario.idUsuario = idUsuario;
    } else {
      alert('⚠️ No se encontró información del usuario. Por favor, inicia sesión nuevamente.');
      this.router.navigate(['/login']);
    }
  }

  cargarMesasDisponibles(): void {
    this.mesaService.getMesasDisponibles().subscribe({
      next: (data) => {
        this.mesas = data;
        console.log('✅ Mesas disponibles:', this.mesas);
      },
      error: (err) => {
        console.error('❌ Error al cargar mesas:', err);
        this.mesas = [];
      }
    });
  }

  registrar(): void {
  if (
    !this.reserva.fecha ||
    !this.reserva.hora ||
    !this.reserva.numeroPersonas ||
    !this.reserva.mesa.idMesa
  ) {
    alert('⚠️ Por favor completa todos los campos');
    return;
  }

  const reservaPayload = {
    fecha: this.reserva.fecha,
    hora: this.reserva.hora.length === 5 ? this.reserva.hora + ':00' : this.reserva.hora,
    numeroPersonas: Number(this.reserva.numeroPersonas),
    usuario: { idUsuario: Number(this.reserva.usuario.idUsuario) },
    mesa: { idMesa: Number(this.reserva.mesa.idMesa) }
  };

  console.log('📤 Enviando reserva:', JSON.stringify(reservaPayload, null, 2));

  this.reservaService.registrarReserva(reservaPayload).subscribe({
  next: (response) => {
    console.log('✅ Respuesta cruda del backend:', response);
    let parsedResponse: any;
    try {
      parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
    } catch (e) {
      console.error('❌ Error al parsear JSON:', e);
      parsedResponse = {};
    }

    console.log('🧩 Respuesta parseada:', parsedResponse);

    const idReserva = parsedResponse.idReserva;

    if (idReserva) {
      localStorage.setItem('idReserva', idReserva.toString());
      console.log('💾 idReserva guardado en localStorage:', idReserva);
    } else {
      console.warn('⚠️ No se encontró idReserva en la respuesta:', parsedResponse);
    }

    alert('🎉 ¡Reserva registrada exitosamente!');
    this.router.navigate(['/cliente/registrar-transporte']);
  },
  error: (err) => {
    console.error('❌ Error al registrar reserva:', err);
    alert('Error al registrar la reserva. Intenta nuevamente.');
  }
});

}

  logout(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      localStorage.clear();
      console.log('🚪 Sesión cerrada');
      this.router.navigate(['/login']);
    }
  }
>>>>>>> dev
}
