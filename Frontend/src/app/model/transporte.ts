import { Reserva } from "./reserva";

export interface Transporte {
    idTransporte?: number;
    direccion: string;
    numeroPasajeros: number;
    reserva?: Partial<Reserva>;
}
