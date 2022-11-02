import { Empleado } from './../../../interfaces/empleado.interface';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { EmpleadosService } from './../../../services/empleados.service';
import { Component, OnInit } from '@angular/core';

import {map} from 'rxjs/operators';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosTemp: Empleado[] = [];

  constructor(
              private empleadoservice:EmpleadosService,
              private busquedaService:BusquedaService
              ) {
    this.cargarempleados();


  }

  ngOnInit(): void {

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

}
