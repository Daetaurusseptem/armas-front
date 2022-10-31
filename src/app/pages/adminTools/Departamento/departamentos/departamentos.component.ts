import { BusquedaService } from 'src/app/services/busqueda.service';
import { Departamento } from './../../../../interfaces/departamento.interface';
import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from 'src/app/services/departamento.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  departamentos: Departamento[] = [];
  departamentosTemp: Departamento[] = [];

  constructor(
              private departamentosService:DepartamentoService,
              private busquedaService:BusquedaService
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
        return item.departamento
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

}

