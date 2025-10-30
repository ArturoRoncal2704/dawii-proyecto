import { Rol } from './rol';

export class Usuario {
  idUsuario?: number;
  nombre: string = '';
  correo: string = '';
  contrasena?: string;
  telefono: string = '';
  enabled?: number;
  roles: Rol[] = [];
}
