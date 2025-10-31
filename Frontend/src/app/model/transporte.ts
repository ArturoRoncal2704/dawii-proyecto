<<<<<<< HEAD
=======
import { Reserva } from "./reserva";

>>>>>>> dev
export interface Transporte {
    idTransporte?: number;
    direccion: string;
    numeroPasajeros: number;
<<<<<<< HEAD
    idReserva: number;
=======
    reserva?: Partial<Reserva>;
>>>>>>> dev
}
