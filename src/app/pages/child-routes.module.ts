import { SeleccionAreaComponent } from './navigationTools/seleccion-area/seleccion-area.component';
import { SeleccionEmpresaComponent } from './navigationTools/seleccion-empresa/seleccion-empresa.component';
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
  //INICIO ADMIN TOOLS

    //ADMIN PAGES
    { path: 'inicio-admin', component: InicioAdminComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},
    //Empresas
    { path: 'admin/empresas', canActivate:[AdminGuard],component: EmpresasComponent, data:{title: 'catalogo de empresas'}},
    { path: 'admin/empresas/crear-empresa', canActivate:[AdminGuard], component: CrearEmpresaComponent, data:{title: 'crear Empresa'}},
    { path: 'admin/empresas/editar-empresa/:id',canActivate:[AdminGuard], component: EditarEmpresaComponent, data:{title: 'Editar Empresa'}},

    //Areas
    { path: 'admin/areas', component: AreasComponent,canActivate:[AdminGuard], data:{title: 'catalogo de areas'}},
    { path: 'admin/areas/crear-area', component: CrearAreaComponent,canActivate:[AdminGuard], data:{title: 'crear Empresa'}},
    { path: 'admin/areas/editar-area/:id', component: EditarAreaComponent,canActivate:[AdminGuard], data:{title: 'Editar Area'}},
    //Usuarios
    { path: 'admin/usuarios', component: UsuariosComponent,canActivate:[AdminGuard], data:{title: 'catalogo de usuarios'}},
    { path: 'admin/usuarios/crear-usuario', component: CrearUsuarioComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},
    { path: 'usuarios/editar-usuario/:id', component: EditarUsuarioComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},
    //Departaadmin/mentos
    { path: 'admin/departamentos', component: DepartamentosComponent,canActivate:[AdminGuard], data:{title: 'catalogo de usuarios'}},
    { path: 'admin/departamentos/crear-departamento', component: CrearDepartamentosComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},
    { path: 'admin/departamentos/editar-departamento/:id', component: EditarUsuarioComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},

  //FINAL ADMIN TOOLS




  //INICIO USER TOOLS

  //*Select MENU
    //Select departamento - EN DESUSO
    { path: 'departamentos', component: SeleccionDepartamentosComponent,canActivate:[AdminOrUserGuard], data:{title: 'seleccione de empresa'}},
    //Select empresa
    { path: 'empresas', component: SeleccionEmpresaComponent, canActivate:[AdminOrUserGuard], data:{title: 'seleccione de empresa'}},
    //Select Area de la Empresa
    { path: 'empresas/:idEmpresa/areas', component: SeleccionAreaComponent, canActivate:[AdminOrUserGuard], data:{title: 'seleccione de empresa'}},

    //*Empleados
    //Empleados por area
    { path: 'empresas/:idEmpresa/:idArea', component: EmpleadosComponent, canActivate:[AdminOrUserGuard], data:{title: 'seleccione de empresa'}},
    //Crear Empleado
    { path: 'empresas/crear-empleado', component: CrearEmpleadoComponent,canActivate:[AdminOrUserGuard], data:{title: 'crear Empleado'}},
    { path: 'empleados/editar-empleado/:idDepartamento', component: CrearEmpleadoComponent,canActivate:[AdminOrUserGuard], data:{title: 'crear Usuario'}},

  //FINAL USER TOOLS

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
