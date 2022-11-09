import { Empleado } from './../../../interfaces/empleado.interface';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { EmpleadosService } from './../../../services/empleados.service';
import { Component, OnInit } from '@angular/core';

import {map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/interfaces/area.interface';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosTemp: Empleado[] = [];
  areaId:string
  empresaId:string
  area:Area;
  empresa:Empresa;
  constructor(
              private empleadoservice:EmpleadosService,
              private empresasService:EmpresaService,
              private areaService:AreaService,
              private busquedaService:BusquedaService,
              private activatedRoute:ActivatedRoute
              ) {



  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.empresaId=params['idEmpresa']
      this.areaId=params['idArea']
      this.cargarEmpleados(this.empresaId);
      this.obtenerEmpresa(this.empresaId)
      this.areaService.getArea(this.areaId)
      .pipe(
        map(item=>{
          return item.area
        })
      )
      .subscribe(area=>{
        this.area =area
      })
    })

  }

  cargarEmpleados(id:string){
    this.empleadoservice.getEmpleadosEmpresaId(id)
    .pipe(
      map(item=>{
        console.log(item);
        this.empleadosTemp = item.empleados
        return item.empleados
      })
    )
    .subscribe(
      r=>{
        this.empleados = r
      }
    )
  }

  buscar(termino: string): any{

    //si la busqueda es 0 los empleados guardados en empleados temp se asignan de nuevo
    if (termino.length === 0 ){
      this.empleados = [...this.empleadosTemp];
      return;
    }

    this.busquedaService.buscar('empleados', termino)
    .subscribe( (resultados:Empleado[]) => {
      console.log(resultados);
      this.empleados = resultados
    });
  }

  obtenerEmpresa(id:string){
    this.empresasService.getEmpresa(id)
    .pipe(
      map(item=>{
        return item.empresa
      })
    )
    .subscribe(empresa=>{
      this.empresa = empresa
    })
  }

}
