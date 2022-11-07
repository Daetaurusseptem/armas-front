import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import {map} from 'rxjs/operators';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-seleccion-departamentos',
  templateUrl: './seleccion-departamentos.component.html',
  styleUrls: ['./seleccion-departamentos.component.css']
})
export class SeleccionDepartamentosComponent implements OnInit {
  departamentos: Departamento[] = [];
  departamentosTemp: Departamento[] = [];
  empresaId:string

  constructor(
              private departamentosService:DepartamentoService,
              private busquedaService:BusquedaService,
              private activatedRoute:ActivatedRoute
              ) {
    this.cargaDepartamentos();


  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      this.empresaId=params['idEmpresa']
    })

  }

  cargaDepartamentos(){
    this.departamentosService.getDepartamentos()
    .pipe(
      map(item=>{
        console.log(item);
        this.departamentosTemp=item.departamentos
        return item.departamentos
      })
    )
    .subscribe(
      r=>{
        this.departamentos = r
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
