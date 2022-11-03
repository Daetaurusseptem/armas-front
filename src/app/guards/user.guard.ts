import { UsuariosService } from 'src/app/services/usuarios.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private usuarioService:UsuariosService,
    private router:Router
    ){}
canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot):  boolean  {
  console.log(this.usuarioService.role);
if(this.usuarioService.role=='USER_ROLE'){
  console.log('es user');
  this.router.navigateByUrl('/dashboard/empresas')
  return true;
}else{
  console.log('nel');
this.router.navigateByUrl('/dashboard')
return false
}


}
}
