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