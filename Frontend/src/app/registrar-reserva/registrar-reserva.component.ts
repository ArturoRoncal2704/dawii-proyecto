import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../service/reserva.service';
import { MesaService } from '../service/mesa.service';

@Component({
  selector: 'app-registrar-reserva',
  standalone: false,
  templateUrl: './registrar-reserva.component.html',
  styleUrl: './registrar-reserva.component.css'
})
export class RegistrarReservaComponent implements OnInit {

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
    private reservaService: ReservaService,
    private mesaService: MesaService
  ) {}

  ngOnInit(): void {
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
}
