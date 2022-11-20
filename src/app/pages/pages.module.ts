import { InicioAdminComponent } from './adminTools/adminPages/inicio-admin/inicio-admin.component';
import { CrearDepartamentosComponent } from './adminTools/Departamento/crear-departamentos/crear-departamentos.component';
import { DepartamentosComponent } from './adminTools/Departamento/departamentos/departamentos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { CrearUsuarioComponent } from './adminTools/Usuario/crear-usuario/crear-usuario.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { UsuariosComponent } from './adminTools/Usuario/usuarios/usuarios.component';
import { EmpresasComponent } from './adminTools/Empresa/empresas/empresas.component';
import { CrearEmpresaComponent } from './adminTools/Empresa/crear-empresa/crear-empresa.component';
import { AreasComponent } from './adminTools/Area/areas/areas.component';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './adminTools/Usuario/editar-usuario/editar-usuario.component';
import { EditarEmpresaComponent } from './adminTools/Empresa/editar-empresa/editar-empresa.component';
import { CrearAreaComponent } from './adminTools/Area/crear-area/crear-area.component';
import { EmpleadosComponent } from './userTools/empleados/empleados.component';
import { CrearEmpleadoComponent } from './userTools/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './userTools/editar-empleado/editar-empleado.component';
import { EditarAreaComponent } from './adminTools/Area/editar-area/editar-area.component';
import { SeleccionEmpresaComponent } from './navigationTools/seleccion-empresa/seleccion-empresa.component';
import { SeleccionDepartamentosComponent } from './navigationTools/seleccion-departamentos/seleccion-departamentos.component';
import { EmpleadosDepartamentoComponent } from './navigationTools/empleados-departamento/empleados-departamento.component';
import { SeleccionAreaComponent } from './navigationTools/seleccion-area/seleccion-area.component';
import { ExpedienteEmpleadoComponent } from './userTools/expediente-empleado/expediente-empleado.component';
import { AgregarExpedienteComponent } from './userTools/agregar-expediente/agregar-expediente.component';
import { CrearTipoExpedientesComponent } from './userTools/crear-tipo-expedientes/crear-tipo-expedientes.component';
import { DepartamentosUsuarioComponent } from './userTools/departamentos-usuario/departamentos-usuario.component';


@NgModule({
  declarations: [

       PagesComponent,
       PageNotFoundComponent,
       CrearUsuarioComponent,
       UsuariosComponent,
       EmpresasComponent,
       CrearEmpresaComponent,
       AreasComponent,
       DepartamentosComponent,
       CrearDepartamentosComponent,
       InicioAdminComponent,
       EditarUsuarioComponent,
       EditarEmpresaComponent,
       CrearAreaComponent,
       EmpleadosComponent,
       CrearEmpleadoComponent,
       EditarEmpleadoComponent,
       EditarAreaComponent,
       SeleccionEmpresaComponent,
       SeleccionDepartamentosComponent,
       EmpleadosDepartamentoComponent,
       SeleccionAreaComponent,
       ExpedienteEmpleadoComponent,
       AgregarExpedienteComponent,
       CrearTipoExpedientesComponent,
       DepartamentosUsuarioComponent,




  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class PagesModule { }
