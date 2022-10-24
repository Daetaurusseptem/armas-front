import { EditarEmpresaComponent } from './adminTools/editar-empresa/editar-empresa.component';
import { CrearEmpresaComponent } from './adminTools/crear-empresa/crear-empresa.component';
import { EmpresasComponent } from './adminTools/empresas/empresas.component';
import { AreasComponent } from './adminTools/areas/areas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { CrearUsuarioComponent } from './adminTools/crear-usuario/crear-usuario.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InicioAdminComponent } from './adminTools/inicio-admin/inicio-admin.component';
import { UsuariosComponent } from './adminTools/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './adminTools/editar-usuario/editar-usuario.component';

const childRoutes:Routes=[
  { path: '', component: PagesComponent, data:{title: 'Dashboard'}},
  //Admin Tools

  //Empresas
  { path: 'empresas', component: EmpresasComponent, data:{title: 'catalogo de empresas'}},
  { path: 'empresas/crear-empresa', component: CrearEmpresaComponent, data:{title: 'crear Empresa'}},
  { path: 'empresas/editar-empresa/:id', component: EditarEmpresaComponent, data:{title: 'Editar Empresa'}},
  //Areas
  { path: 'areas', component: AreasComponent, data:{title: 'catalogo de areas'}},
  //Usuarios
  { path: 'inicio-admin', component: InicioAdminComponent, data:{title: 'crear Usuario'}},
  { path: 'usuarios', component: UsuariosComponent, data:{title: 'catalogo de usuarios'}},
  { path: 'usuarios/crear-usuario', component: CrearUsuarioComponent, data:{title: 'crear Usuario'}},
  { path: 'usuarios/editar-usuario/:id', component: EditarUsuarioComponent, data:{title: 'crear Usuario'}},
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
