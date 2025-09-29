import { Component, OnInit } from '@angular/core';
import { ContadorService } from '../service/contador.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  totalReservas = 0;
  totalUsuarios = 0;
  totalMesasDisponibles = 0;

  constructor(private contador: ContadorService) {}

  ngOnInit(): void {
    this.contador.getTotales().subscribe((data) => {
      this.totalReservas = data.reservas;
      this.totalUsuarios = data.usuarios;
      this.totalMesasDisponibles = data.mesasDisponibles;
    });
  }

}
