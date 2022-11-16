import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import {map} from 'rxjs/operators';
import { Area } from 'src/app/interfaces/area.interface';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
@Component({
  selector: 'app-departamentos-usuario',
  templateUrl: './departamentos-usuario.component.html',
  styleUrls: ['./departamentos-usuario.component.css']
})
export class DepartamentosUsuarioComponent implements OnInit {
  areaId: string;
  empresaId: string;
  area: Area;
  empresa: Empresa;



  departamentos: Departamento[] = [];
  departamentosTemp: Departamento[] = [];

  constructor(
              private departamentosService:DepartamentoService,
              private busquedaService:BusquedaService,
              private empresasService:EmpresaService,
              private empleadoService:EmpleadosService
              ) {
    this.cargarAreas();


  }

  ngOnInit(): void {

  }

  cargarAreas(){
    this.departamentosService.getDepartamentos()
    .pipe(
      map(item=>{
        console.log(item);
        return item.departamentos
      })
    )
    .subscribe(
      r=>{
        this.departamentos = r
        this.departamentosTemp = r
      }
    )
  }
  buscar(termino: string): any{

    //si la busqueda es 0 los usuarios guardados en usuarios temp se asignan de nuevo
    if (termino.length === 0 ){
      this.departamentos = [...this.departamentosTemp];
      return;
    }

    this.busquedaService.buscar('departamentos', termino)
    .subscribe( (resultados: any[]) => {
      console.log(resultados);
      this.departamentos = resultados;
    });
  }

  // obtenerArea(id: string) {
  //   this.areaService
  //     .getArea(id)
  //     .pipe(
  //       map((item) => {
  //         return item.area;
  //       })
  //     )
  //     .subscribe((area) => {
  //       this.area = area;
  //     });
  // }


  obtenerEmpresa(id: string) {
    this.empresasService
      .getEmpresa(id)
      .pipe(
        map((item) => {
          return item.empresa;
        })
      )
      .subscribe((empresa) => {
        this.empresa = empresa;
      });
  }

}
