import { Empleado } from './../../../interfaces/empleado.interface';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { EmpleadosService } from './../../../services/empleados.service';
import { Component, OnInit } from '@angular/core';

import {map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosTemp: Empleado[] = [];
  empresa:Empresa;
  empresaId:string
  areaId:string
  constructor(
              private empleadoservice:EmpleadosService,
              private empresasService:EmpresaService,
              private busquedaService:BusquedaService,
              private activatedRoute:ActivatedRoute
              ) {
    this.cargarempleados();


  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.empresaId=params['idEmpresa']
      this.areaId=params['idArea']
      this.obtenerEmpresa(this.empresaId)
    })

  }

  cargarempleados(){
    this.empleadoservice.getEmpleados()
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
