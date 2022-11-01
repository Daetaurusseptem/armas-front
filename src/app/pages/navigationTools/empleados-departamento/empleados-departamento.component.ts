import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { DepartamentoService } from 'src/app/services/departamento.service';

import {map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from 'src/app/interfaces/empleado.interface';


@Component({
  selector: 'app-empleados-departamento',
  templateUrl: './empleados-departamento.component.html',
  styleUrls: ['./empleados-departamento.component.css']
})
export class EmpleadosDepartamentoComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosTemp: Empleado[] = [];
  departamento:Departamento

  constructor(
              private departamentosService:DepartamentoService,
              private busquedaService:BusquedaService,
              private activatedRoute:ActivatedRoute,
              private empleadoService:EmpleadosService
              ) {
                this.activatedRoute.params.subscribe(params=>{
                  console.log(params['id']);
                  this.obtenerEmpleados(params['id']).subscribe(
                    empleados=>{
                      this.empleados = empleados
                    }
                  )
                  this.departamentosService.getDepartamento(params['id'])
                      .pipe(map(item=>{
                        return item.departamento
                      }))
                      .subscribe(departamento=>{
                        this.departamento = departamento
                        console.log(departamento);
                      }
                      )
                })



  }

  ngOnInit(): void {

  }
  obtenerEmpleados(id:string){
    return this.empleadoService.getEmpleadosDepartamentoId(id)
    .pipe(
      map(item=>{
        console.log(item);
        return item.empleados
      })
    )
  }
  cargarEmpleadosDepartamento(){
    this.departamentosService.getDepartamentos()
    .pipe(
      map(item=>{
        console.log(item);
        return item.empleados
      })
    )
    .subscribe(
      r=>{
        this.empleados = r
        this.empleadosTemp = r
      }
    )
  }
  buscar(termino: string): any{
    const idDepartamento:string = this.departamento.id
    //si la busqueda es 0 los usuarios guardados en usuarios temp se asignan de nuevo
    if (termino.length === 0 ){
      this.empleados = [...this.empleadosTemp];
      return;
    }

    this.empleadoService.buscarEmpleadoDepartamento(idDepartamento, termino)
    .subscribe( obj => {
      console.log(obj);
      this.empleados = obj.empleados
    });
  }

}
