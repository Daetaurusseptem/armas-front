import { ArrayResponse } from './../../../interfaces/arrayResponse.interface';
import { Empresa } from './../../../interfaces/empresa.interface';
import { EmpresaService } from './../../../services/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { AreaService } from './../../../services/area.service';
import { Area } from './../../../interfaces/area.interface';
import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { itemResponse } from 'src/app/interfaces/itemResponse.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioModel } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-seleccion-area',
  templateUrl: './seleccion-area.component.html',
  styleUrls: ['./seleccion-area.component.css']
})
export class SeleccionAreaComponent implements OnInit {
  areas: Area[] = [];
  areasConPermiso: any[] = [];
  areasTemp: Area[] = [];
  empresaId: any
  empresa: Empresa
  usuarioModel: UsuarioModel
  empresas: Empresa[] = [];
  empresasTemp: Empresa[] = [];



  constructor(
              private areasService:AreaService,
              private busquedaService:BusquedaService,
              private usuarioService:UsuariosService,
              private activatedRoute:ActivatedRoute,
              private empresasService:EmpresaService,

              ) {


  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=>{
        this.empresaId = params['idEmpresa']
        this.empresasService.getEmpresa(this.empresaId)
        .subscribe(
          empresa=>{
            this.empresa = empresa.empresa
          }
        )
        this.cargaAreas(this.empresaId);

      }
    )


  }

  cargaAreas(idEmpresa:string){
    this.areasService.getAreasEmpresa(this.empresaId)
    .pipe(
      map(item=>{
        console.log(item);



        return item.areas
      })
    )
    .subscribe(
      (r:Area[])=>{


        this.usuarioModel = this.usuarioService.usuario
        //obtener array de empresas en las que cuenta algun tipo de permiso
        this.usuarioModel.Areas.map(r=>{
          this.areasConPermiso.push(r.id)
        })

        this.areas = r.filter( i =>
          this.areasConPermiso.includes( i.id )
          );
        this.areasTemp = this.areas


        console.info('Empresas permitidas' ,this.areasConPermiso );



      }
    )
  }



}



