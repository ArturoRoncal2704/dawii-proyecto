<<<<<<< HEAD
export class Usuario {
  idUsuario?: number;
  nombre!: string;
  correo!: string;
  contrasena!: string;
  telefono!: string;
  rol?: Rol;
}

export enum Rol {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE'
}
=======
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
>>>>>>> dev
