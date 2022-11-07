import { UsuarioModel } from 'src/app/models/Usuario.model';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, TitleStrategy, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresaService } from '../services/empresa.service';
import { AreaService } from '../services/area.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmpresaPermisoGuard implements CanActivate {
  empresas: Empresa[] = [];
  empresasConPermiso: any[] = [];
  usuarioModel: UsuarioModel;
  empresaId: string;
  empresa: Empresa;

  constructor(
    private router: Router,
    private Route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private empresasService: EmpresaService

  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    console.log('area permisos guard');

    this.empresaId= route.params['idEmpresa']
    console.log( this.empresaId);
     if (!this.comprobarEmpresaPermiso(this.empresaId)) {
       Swal.fire({
         title: 'Empresa no existente o sin permisos',
         icon:'error'
        });
       console.log('No Permitida');
       this.router.navigateByUrl('/')
       return false;
     } else {

       console.log('Permitida');
       return true;
     }
  }


  comprobarEmpresaPermiso(empresaId:string):boolean{
    let resp:boolean



          this.usuarioModel = this.usuarioService.usuario
          //obtener array de empresas en las que cuenta algun tipo de permiso
          this.usuarioModel.Areas.map(r=>{
            this.empresasConPermiso.push(r.empresaId)
          })


          console.log('empresas permitidas', this.empresasConPermiso);

          //*comprobar si areasConPermiso incluye el id de el area actual

          if(this.empresasConPermiso.includes(empresaId)){

          console.log('si');

          this.empresasConPermiso=[]
          resp = true

        }else{
          this.empresasConPermiso=[]
            resp = false
        }
        return resp

        }


}
