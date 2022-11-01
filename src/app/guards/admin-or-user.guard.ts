import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrUserGuard implements CanActivate {
  constructor(
    private usuarioService:UsuariosService,
    private router:Router
    ){}
canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot):  boolean  {
  console.log(this.usuarioService.role);
if(this.usuarioService.role=='ADMIN_ROLE' || this.usuarioService.role=='USER_ROLE'){
return true;
}else{
  console.log('nel');
this.router.navigateByUrl('/dashboard')
return false
}


}

}
