import { Empresa } from './../../../interfaces/empresa.interface';
import { BusquedaService } from './../../../services/busqueda.service';
import { EmpresaService } from './../../../services/empresa.service';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-seleccion-empresa',
  templateUrl: './seleccion-empresa.component.html',
  styleUrls: ['./seleccion-empresa.component.css']
})
export class SeleccionEmpresaComponent implements OnInit {
  empresas: Empresa[] = [];
  empresasTemp: Empresa[] = [];

  constructor(
              private empresasService:EmpresaService,
              private busquedaService:BusquedaService
              ) {
    this.cargaEmpresas();


  }

  ngOnInit(): void {

  }

  cargaEmpresas(){
    this.empresasService.getEmpresas()
    .pipe(
      map(item=>{
        console.log(item);
        this.empresasTemp=item.empresas
        return item.empresas
      })
    )
    .subscribe(
      r=>{
        this.empresas = r
      }
    )
  }

  buscar(termino: string): any{

    //si la busqueda es 0 los usuarios guardados en usuarios temp se asignan de nuevo
    if (termino.length === 0 ){
      this.empresas = [...this.empresasTemp];
      return;
    }

    this.busquedaService.buscar('empresas', termino)
    .subscribe( (resultados: any[]) => {
      console.log(resultados);
      this.empresas = resultados;
    });
  }
}
