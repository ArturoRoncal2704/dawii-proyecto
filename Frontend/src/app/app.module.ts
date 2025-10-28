import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListadoReservaComponent } from './listado-reserva/listado-reserva.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { InicioComponent } from './inicio/inicio.component';
import { ActualizarReservaComponent } from './actualizar-reserva/actualizar-reserva.component';
import { ListadoMesaComponent } from './listado-mesa/listado-mesa.component';
import { RegistrarMesaComponent } from './registrar-mesa/registrar-mesa.component';
import { ActualizarMesaComponent } from './actualizar-mesa/actualizar-mesa.component';
import { ListadoTransporteComponent } from './listado-transporte/listado-transporte.component';
import { ActualizarTransporteComponent } from './actualizar-transporte/actualizar-transporte.component';
import { PaginaClienteComponent } from './pagina-cliente/pagina-cliente.component';
import { ListadoEstadoMesaComponent } from './listado-estado-mesa/listado-estado-mesa.component';
import { RegistrarEstadoMesaComponent } from './registrar-estado-mesa/registrar-estado-mesa.component';
import { ActualizarEstadoMesaComponent } from './actualizar-estado-mesa/actualizar-estado-mesa.component';
import { RegistrarReservaComponent } from './registrar-reserva/registrar-reserva.component';
import { RegistrarTransporteComponent } from './registrar-transporte/registrar-transporte.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { ActualizarUsuarioComponent } from './actualizar-usuario/actualizar-usuario.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    ListadoReservaComponent,
    PaginaPrincipalComponent,
    InicioComponent,
    ActualizarReservaComponent,
    ListadoMesaComponent,
    RegistrarMesaComponent,
    ActualizarMesaComponent,
    ListadoTransporteComponent,
    ActualizarTransporteComponent,
    PaginaClienteComponent,
    ListadoEstadoMesaComponent,
    RegistrarEstadoMesaComponent,
    ActualizarEstadoMesaComponent,
    RegistrarReservaComponent,
    RegistrarTransporteComponent,
    ListarUsuariosComponent,
    ActualizarUsuarioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },  
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
