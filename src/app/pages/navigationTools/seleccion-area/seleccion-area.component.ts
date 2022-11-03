import { ArrayResponse } from './../../../interfaces/arrayResponse.interface';
import { Empresa } from './../../../interfaces/empresa.interface';
import { EmpresaService } from './../../../services/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { AreaService } from './../../../services/area.service';
import { Area } from './../../../interfaces/area.interface';
import { Component, OnInit } from '@angular/core';

import {map} from 'rxjs/operators';
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
  areasTemp: Area[] = [];
  empresaId:any
  empresa:Empresa
  usuario:UsuarioModel

  constructor(
              private areasService:AreaService,
              private busquedaService:BusquedaService,
              private activatedRoute:ActivatedRoute,
              private EmpresaService:EmpresaService,
              private usuarioService:UsuariosService
              ) {



  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario
    console.log(this.usuario);
    this.getEmpresaId()
  }

  cargaAreas(){

    this.areasService.getAreasEmpresa(this.empresaId)
    .pipe(
      map((item:ArrayResponse)=>{
        console.log(item);

        this.areasTemp=item.areas


        return item.areas
      })
    )
    .subscribe(
      r=>{
        let filtroAreas:any[]=[];
        this.usuarioService.usuario.Areas.forEach(e=>{
          console.log(r);
        })
        const areasFiltradas = r.filter(obj=>{
          if(filtroAreas.includes(obj.id)){
            return ''
          }
          else{
            return obj
          }
        })
        this.areas = areasFiltradas
      }
    )
  }

  buscar(termino: string): any{

    //si la busqueda es 0 los usuarios guardados en usuarios temp se asignan de nuevo
    if (termino.length === 0 ){
      this.areas = [...this.areasTemp];
      return;
    }

    this.busquedaService.buscar('areas', termino)
    .subscribe( (resultados: any[]) => {
      console.log(resultados);
      this.areas = resultados;
    });
  }

  getEmpresaId(){
    this.activatedRoute.params.subscribe(param=>{
      this.empresaId=param['idEmpresa']
      this.getEmpresa(this.empresaId)
      this.cargaAreas();
    })
  }
  getEmpresa(id:string){
    this.EmpresaService.getEmpresa(id).subscribe(
      (r:itemResponse)=>{
        console.log(id);
        this.empresa = r.empresa
        console.log(this.empresa);
      }
    )
  }
}
