import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const childRoutes:Routes=[
  { path: '', component: PagesComponent, data:{title: 'Dashboard'}},
  //Admin Tools
  { path: 'crear-usuario', component: CrearUsuarioComponent, data:{title: 'crear Usuario'}},
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
