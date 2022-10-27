import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {  PagesRoutingModule } from './pages/pages.routing';


const routes: Routes = [
  { path: '', redirectTo:'/dashboard', title:'algo', pathMatch:'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
