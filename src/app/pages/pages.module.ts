import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [

       PagesComponent,
       PageNotFoundComponent,
       CrearUsuarioComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    NgxCaptchaModule
  ]
})
export class PagesModule { }
