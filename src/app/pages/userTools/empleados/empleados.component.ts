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
import { FormBuilder, Validators } from '@angular/forms';
import { Busqueda } from 'src/app/interfaces/Busqueda.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { itemResponse } from 'src/app/interfaces/itemResponse.interface';
import { ArrayResponse } from 'src/app/interfaces/arrayResponse.interface';

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
  departamentoSelected:string;
  departamentos:Departamento[]
  departamentoBusquedaSelect = this.fb.group({
    departamentoId:['', [Validators.required]],
    termino:['', [Validators.required]]
  })
  constructor(
              private empleadoService:EmpleadosService,
              private empresasService:EmpresaService,
              private areaService:AreaService,
              private departamentosService:DepartamentoService,
              private busquedaService:BusquedaService,
              private activatedRoute:ActivatedRoute,
              private fb: FormBuilder
              ) {



  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      this.empresaId=params['idEmpresa']
      this.areaId=params['idArea']


      this.obtenerDepartamentos(this.empresaId);
      this.cambioDepartamento();
      this.cargarEmpleados(this.empresaId);
      this.obtenerEmpresa(this.empresaId);
      this.obtenerArea(this.areaId);
    })

  }

  cargarEmpleados(id:string){
    this.empleadoService.getEmpleadosEmpresaId(id)
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
    if (termino.length === 0 && this.departamentoSelected==''||undefined){
      this.empleados = [...this.empleadosTemp];
      return;
    }
    if(this.departamentoSelected!==''||undefined && this.departamentoBusquedaSelect.get('termino').value !== ''||undefined){
      this.empleadoService.buscarEmpleadoEmpresa(this.empresaId, termino, this.departamentoSelected )
      .pipe(
        map(item=>{
          console.log(item);
          return item.empleados
        })
        )
      .subscribe( empleados => {
        console.log(empleados);
        this.empleados = empleados
      });
    }
    this.empleadoService.buscarEmpleadoEmpresa(this.empresaId, termino )
    .pipe(
      map(item=>item.empleados)
      )
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
  obtenerArea(id:string){
    this.areaService.getArea(id)
      .pipe(
        map(item=>{
          return item.area
        })
      )
      .subscribe(area=>{
        this.area =area
      })
  }
  obtenerDepartamentos(id:string){
    this.departamentosService.getDepartamentosEmpresa(id)
    .pipe(
      map((r:ArrayResponse)=>{
        console.log(r);
        return r.departamentos
      })
    )
    .subscribe(departamentos=>{
      this.departamentos=departamentos
    })
  }

  cambioDepartamento(){
    this.departamentoBusquedaSelect.get('departamentoId')
    .valueChanges
    .subscribe(departamento=>{
      console.log(departamento);
      this.departamentoSelected = departamento
      this.buscar(this.departamentoBusquedaSelect.get('termino').value || '')

    })
  }
}
