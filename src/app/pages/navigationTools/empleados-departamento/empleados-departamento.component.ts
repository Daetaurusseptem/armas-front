import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { DepartamentoService } from 'src/app/services/departamento.service';

import {map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { EmpresaService } from 'src/app/services/empresa.service';


@Component({
  selector: 'app-empleados-departamento',
  templateUrl: './empleados-departamento.component.html',
  styleUrls: ['./empleados-departamento.component.css']
})
export class EmpleadosDepartamentoComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosTemp: Empleado[] = [];
  departamento:Departamento
  empresa:Empresa;


  constructor(
              private departamentosService:DepartamentoService,
              private busquedaService:BusquedaService,
              private activatedRoute:ActivatedRoute,
              private empleadoService:EmpleadosService,
              private empresaService:EmpresaService
              ) {
                this.activatedRoute.params.subscribe(params=>{
                  this.departamentosService.getDepartamento(params['empresaId'])
                  .pipe(map(i=>i.empresa))
                  .subscribe(e=>{this.empresa=e})
                  this.obtenerEmpleados(params['departamentoId'])
                  this.departamentosService.getDepartamento(params['departamentoId'])
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
      map(item=>item.empleados))
    .subscribe(empleados=>this.empleados = empleados)
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
  buscar(termino: string, empresaId:string, departamentoId:string ): any{
    const idDepartamento:string = this.departamento.id
    //si la busqueda es 0 los usuarios guardados en usuarios temp se asignan de nuevo
    if (termino.length === 0 ){
      this.empleados = [...this.empleadosTemp];
      return;
    }

    this.empleadoService.buscarEmpleadoEmpresa(empresaId, departamentoId, termino)
    .subscribe( obj => {
      console.log(obj);
      this.empleados = obj.empleados
    });
  }

}
