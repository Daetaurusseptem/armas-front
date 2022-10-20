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
  { path: 'inicio-admin', component: InicioAdminComponent, data:{title: 'crear Usuario'}},
  { path: 'usuarios', component: UsuariosComponent, data:{title: 'crear Usuario'}},
  { path: 'usuarios/crear-usuario', component: CrearUsuarioComponent, data:{title: 'crear Usuario'}},
  { path: 'usuarios/editar-usuario/:id', component: EditarUsuarioComponent, data:{title: 'crear Usuario'}},
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
