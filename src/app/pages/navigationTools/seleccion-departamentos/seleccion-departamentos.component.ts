import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import {map} from 'rxjs/operators';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-seleccion-departamentos',
  templateUrl: './seleccion-departamentos.component.html',
  styleUrls: ['./seleccion-departamentos.component.css']
})
export class SeleccionDepartamentosComponent implements OnInit {
  departamentos: Departamento[] = [];
  departamentosTemp: Departamento[] = [];
  empresaId:string
  empresa:Empresa

  constructor(
              private departamentosService:DepartamentoService,
              private empresaService:EmpresaService,
              private busquedaService:BusquedaService,
              private activatedRoute:ActivatedRoute
              ) {



  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      this.empresaId=params['empresaId']
      this.cargaDepartamentos(this.empresaId);
      this.empresaService.getEmpresa(this.empresaId)
      .pipe(
        map(item=>{
          return item.empresa
        }
        )
      )
      .subscribe(empresa=>{
        this.empresa = empresa
      })
    })

  }

  cargaDepartamentos(id:string){
    this.departamentosService.getDepartamentosEmpresa(id)
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
