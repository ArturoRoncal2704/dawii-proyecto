import { Usuario } from "./usuario";
import { Mesa } from "./mesa";

export interface Reserva {
  idReserva: number;
  fecha: string;
  hora: string;
  numeroPersonas: number;
  usuario: Usuario;
  mesa: Mesa;
}
