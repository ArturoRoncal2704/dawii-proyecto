import { EstadoMesa } from "./estado-mesa";

export interface Mesa {
  idMesa?: number;
  numero: number;
  capacidad: number;
  ubicacion: string;
  estadoMesa: EstadoMesa;
}