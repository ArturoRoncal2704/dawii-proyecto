import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const clienteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (!token || rol !== 'CLIENTE') {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
