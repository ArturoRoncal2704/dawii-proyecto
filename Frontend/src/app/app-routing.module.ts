import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { ListadoReservaComponent } from './listado-reserva/listado-reserva.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { InicioComponent } from './inicio/inicio.component';
import { ActualizarReservaComponent } from './actualizar-reserva/actualizar-reserva.component';
import { ListadoMesaComponent } from './listado-mesa/listado-mesa.component';
import { RegistrarMesaComponent } from './registrar-mesa/registrar-mesa.component';
import { ActualizarMesaComponent } from './actualizar-mesa/actualizar-mesa.component';
import { ListadoTransporteComponent } from './listado-transporte/listado-transporte.component';
import { ActualizarTransporteComponent } from './actualizar-transporte/actualizar-transporte.component';
import { PaginaClienteComponent } from './pagina-cliente/pagina-cliente.component';
import { adminGuard } from './auth/admin.guard';
import { clienteGuard } from './auth/cliente.guard';
import { ListadoEstadoMesaComponent } from './listado-estado-mesa/listado-estado-mesa.component';
import { RegistrarEstadoMesaComponent } from './registrar-estado-mesa/registrar-estado-mesa.component';
import { ActualizarEstadoMesaComponent } from './actualizar-estado-mesa/actualizar-estado-mesa.component';
import { RegistrarReservaComponent } from './registrar-reserva/registrar-reserva.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { ActualizarUsuarioComponent } from './actualizar-usuario/actualizar-usuario.component';
import { RegistrarTransporteComponent } from './registrar-transporte/registrar-transporte.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistrarUsuarioComponent },

  {
    path: 'home',
    component: PaginaPrincipalComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'reservas', component: ListadoReservaComponent },
      { path: 'reservas/actualizar-reserva/:id', component: ActualizarReservaComponent },
      { path: 'mesas', component: ListadoMesaComponent },
      { path: 'registrar-mesa', component: RegistrarMesaComponent },
      { path: 'actualizar-mesa/:id', component: ActualizarMesaComponent },
      { path: 'transportes', component: ListadoTransporteComponent },
      { path: 'actualizar-transporte/:id', component: ActualizarTransporteComponent},
      { path: 'estado-mesa', component: ListadoEstadoMesaComponent },
      { path: 'registrar-estado-mesa', component: RegistrarEstadoMesaComponent },
      { path: 'actualizar-estado-mesa/:id', component: ActualizarEstadoMesaComponent },
      { path: 'listar-usuarios', component: ListarUsuariosComponent },
      { path: 'actualizar-usuarios/:id', component: ActualizarUsuarioComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },

  {
    path: 'cliente',
    component: PaginaClienteComponent,
    canActivate: [clienteGuard]
  },
  {
    path: 'cliente/registrar-reserva',
    component: RegistrarReservaComponent,
    canActivate: [clienteGuard]
  },
  {
    path: 'cliente/registrar-transporte',
    component: RegistrarTransporteComponent,
    canActivate: [clienteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
