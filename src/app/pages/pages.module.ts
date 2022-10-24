import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { CrearUsuarioComponent } from './adminTools/crear-usuario/crear-usuario.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { UsuariosComponent } from './adminTools/usuarios/usuarios.component';
import { EmpresasComponent } from './adminTools/empresas/empresas.component';
import { CrearEmpresaComponent } from './adminTools/crear-empresa/crear-empresa.component';
import { AreasComponent } from './adminTools/areas/areas.component';
import { DepartamentosComponent } from './adminTools/departamentos/departamentos.component';
import { CrearDepartamentosComponent } from './adminTools/crear-departamentos/crear-departamentos.component';
import { InicioAdminComponent } from './adminTools/inicio-admin/inicio-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './adminTools/editar-usuario/editar-usuario.component';
import { EditarEmpresaComponent } from './adminTools/editar-empresa/editar-empresa.component';

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


  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
