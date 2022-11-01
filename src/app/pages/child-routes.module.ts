import { CrearDepartamentosComponent } from './adminTools/Departamento/crear-departamentos/crear-departamentos.component';
import { DepartamentosComponent } from './adminTools/Departamento/departamentos/departamentos.component';
import { UserGuard } from './../guards/user.guard';
import { CrearEmpleadoComponent } from './userTools/crear-empleado/crear-empleado.component';
import { EmpleadosComponent } from './userTools/empleados/empleados.component';
import { AdminGuard } from './../guards/admin.guard';
import { InicioAdminComponent } from './adminTools/adminPages/inicio-admin/inicio-admin.component';
import { EditarEmpresaComponent } from './adminTools/Empresa/editar-empresa/editar-empresa.component';
import { CrearEmpresaComponent } from './adminTools/Empresa/crear-empresa/crear-empresa.component';
import { EmpresasComponent } from './adminTools/Empresa/empresas/empresas.component';
import { AreasComponent } from './adminTools/Area/areas/areas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { CrearUsuarioComponent } from './adminTools/Usuario/crear-usuario/crear-usuario.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { UsuariosComponent } from './adminTools/Usuario/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './adminTools/Usuario/editar-usuario/editar-usuario.component';
import { CrearAreaComponent } from './adminTools/Area/crear-area/crear-area.component';
import { EditarAreaComponent } from './adminTools/Area/editar-area/editar-area.component';
import { SeleccionDepartamentosComponent } from './navigationTools/seleccion-departamentos/seleccion-departamentos.component';
import { AdminOrUserGuard } from '../guards/admin-or-user.guard';
import { EmpleadosDepartamentoComponent } from './navigationTools/empleados-departamento/empleados-departamento.component';

const childRoutes:Routes=[
  { path: '', component: PagesComponent, data:{title: 'Dashboard'}},
  //Admin Tools
  { path: 'inicio-admin', component: InicioAdminComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},

  //Empresas
  { path: 'empresas', canActivate:[AdminGuard],component: EmpresasComponent, data:{title: 'catalogo de empresas'}},
  { path: 'empresas/crear-empresa', canActivate:[AdminGuard], component: CrearEmpresaComponent, data:{title: 'crear Empresa'}},
  { path: 'empresas/editar-empresa/:id',canActivate:[AdminGuard], component: EditarEmpresaComponent, data:{title: 'Editar Empresa'}},
  //Areas
  { path: 'areas', component: AreasComponent,canActivate:[AdminGuard], data:{title: 'catalogo de areas'}},
  { path: 'areas/crear-area', component: CrearAreaComponent,canActivate:[AdminGuard], data:{title: 'crear Empresa'}},
  { path: 'areas/editar-area/:id', component: EditarAreaComponent,canActivate:[AdminGuard], data:{title: 'Editar Area'}},
  // { path: 'areas/editar-area/:id', component: editarAre, data:{title: 'Editar Empresa'}},
  //Usuarios
  { path: 'usuarios', component: UsuariosComponent,canActivate:[AdminGuard], data:{title: 'catalogo de usuarios'}},
  { path: 'usuarios/crear-usuario', component: CrearUsuarioComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},
  { path: 'usuarios/editar-usuario/:id', component: EditarUsuarioComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},
  //Departamentos
  { path: 'departamentos', component: DepartamentosComponent,canActivate:[AdminGuard], data:{title: 'catalogo de usuarios'}},
  { path: 'departamentos/crear-departamento', component: CrearDepartamentosComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},
  { path: 'departamentos/editar-departamento/:id', component: EditarUsuarioComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},
  { path: 'departamento/select-departamento/:id', component: EmpleadosDepartamentoComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},


  //User Tools

  //Select MENU
  { path: 'select-departamento', component: SeleccionDepartamentosComponent,canActivate:[AdminOrUserGuard], data:{title: 'seleccione de empresa'}},
  { path: 'departamento/select-departamento', component: SeleccionDepartamentosComponent,canActivate:[AdminOrUserGuard], data:{title: 'seleccione de empresa'}},


  //Empleados
  { path: 'empleados', component: EmpleadosComponent,canActivate:[UserGuard], data:{title: 'catalogo de usuarios'}},
  { path: 'empleados/crear-empleado/:idDepartamento', component: CrearEmpleadoComponent,canActivate:[AdminOrUserGuard], data:{title: 'crear Usuario'}},
  { path: 'empleados/editar-empleado/:idDepartamento', component: CrearEmpleadoComponent,canActivate:[AdminOrUserGuard], data:{title: 'crear Usuario'}},


  //PAGE NOT FOUND
  { path: '**', component: PageNotFoundComponent }
]


@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class ChildRoutesModule {}
