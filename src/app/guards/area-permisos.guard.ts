import Swal from 'sweetalert2';
import { AreaService } from './../services/area.service';
import { EmpresaService } from './../services/empresa.service';
import { Empresa } from './../interfaces/empresa.interface';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { Area } from './../interfaces/area.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AreaPermisosGuard implements CanActivate {
  areas: Area[] = [];
  areasConPermiso: any[] = [];
  usuarioModel: UsuarioModel;
  empresaId: string;
  empresa: Empresa;
  areaId: string;
  constructor(
    private router: Router,
    private Route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private empresasService: EmpresaService,
    private areasService: AreaService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    console.log('area permisos guard');

    this.areaId= route.params['idArea']
    this.empresaId= route.params['idEmpresa']
    console.log(this.areaId, this.empresaId);
     if (!this.comprobarArea(this.empresaId, this.areaId)) {
       Swal.fire({
         title: 'Area no existente o sin permisos',
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


  comprobarArea(empresaId, areaId):boolean{
    let resp:boolean



          this.usuarioModel = this.usuarioService.usuario
          //obtener array de empresas en las que cuenta algún tipo de permiso
          this.usuarioModel.Areas.map(r=>{
            this.areasConPermiso.push(r.id)
          })


          console.log('areas permitidas', this.areasConPermiso);

          //*comprobar si areasConPermiso incluye el id de el area actual

          if(this.areasConPermiso.includes(areaId)){


          console.log('si');

          resp = true
          this.areasConPermiso=[]
        }else{
          resp = false
          this.areasConPermiso=[]
        }
        return resp

        }





}
