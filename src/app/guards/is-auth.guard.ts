

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private usuariosService:UsuariosService,
              private router:Router
              ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.usuariosService.validarToken()
      .pipe(
        tap(isAuth => {
          if (!isAuth){
            this.router.navigateByUrl('/login');
            console.log('token invalido');
          }

        })
      );
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    return this.usuariosService.validarToken()
    .pipe(
      tap(isAuth => {
        if (!isAuth){
          this.router.navigateByUrl('/login');
          console.log('no podes');
        }
      }))
  }

}
