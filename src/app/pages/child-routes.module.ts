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

const childRoutes:Routes=[
  { path: '', component: PagesComponent, data:{title: 'Dashboard'}},
  //Admin Tools

  //Empresas
  { path: 'empresas', canActivate:[AdminGuard],component: EmpresasComponent, data:{title: 'catalogo de empresas'}},
  { path: 'empresas/crear-empresa', canActivate:[AdminGuard], component: CrearEmpresaComponent, data:{title: 'crear Empresa'}},
  { path: 'empresas/editar-empresa/:id',canActivate:[AdminGuard], component: EditarEmpresaComponent, data:{title: 'Editar Empresa'}},
  //Areas
  { path: 'areas', component: AreasComponent,canActivate:[AdminGuard], data:{title: 'catalogo de areas'}},
  { path: 'areas/crear-area', component: CrearAreaComponent,canActivate:[AdminGuard], data:{title: 'crear Empresa'}},
  // { path: 'areas/editar-area/:id', component: editarAre, data:{title: 'Editar Empresa'}},
  //Usuarios
  { path: 'inicio-admin', component: InicioAdminComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},
  { path: 'usuarios', component: UsuariosComponent,canActivate:[AdminGuard], data:{title: 'catalogo de usuarios'}},
  { path: 'usuarios/crear-usuario', component: CrearUsuarioComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},
  { path: 'usuarios/editar-usuario/:id', component: EditarUsuarioComponent,canActivate:[AdminGuard], data:{title: 'crear Usuario'}},


  //User Tools
  //Empleados
  { path: 'empleados', component: EmpleadosComponent,canActivate:[UserGuard], data:{title: 'catalogo de usuarios'}},
  { path: 'empleados/crear-empleado', component: CrearEmpleadoComponent,canActivate:[UserGuard], data:{title: 'crear Usuario'}},
  { path: 'empleados/editar-empleado/:id', component: EditarUsuarioComponent,canActivate:[UserGuard], data:{title: 'crear Usuario'}},


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
