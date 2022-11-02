import { ArrayResponse } from './../../../interfaces/arrayResponse.interface';
import { Empresa } from './../../../interfaces/empresa.interface';
import { EmpresaService } from './../../../services/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { AreaService } from './../../../services/area.service';
import { Area } from './../../../interfaces/area.interface';
import { Component, OnInit } from '@angular/core';

import {map} from 'rxjs/operators';

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

  constructor(
              private areasService:AreaService,
              private busquedaService:BusquedaService,
              private activatedRoute:ActivatedRoute,
              private EmpresaService:EmpresaService
              ) {
    this.cargaareas();


  }

  ngOnInit(): void {

    this.getEmpresaId()
  }

  cargaareas(){
    this.areasService.getAreas()
    .pipe(
      map((item:ArrayResponse)=>{
        console.log(item);
        this.areasTemp=item.areas
        return item.areas
      })
    )
    .subscribe(
      (r:Area[])=>{
        this.areas = r
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
    })
  }
  getEmpresa(id:string){
    this.EmpresaService.getEmpresa(id).subscribe(
      r=>{
        console.log(id);
        this.empresa = r.empresa
        console.log(this.empresa);
      }
    )
  }
}
