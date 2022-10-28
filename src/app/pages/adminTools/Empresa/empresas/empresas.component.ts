import { Empresa } from '../../../../interfaces/empresa.interface';
import { EmpresaService } from '../../../../services/empresa.service';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[] = [];
  empresasTemp: Empresa[] = [];


  constructor(
              private areaService:EmpresaService,
              private busquedaService:BusquedaService
              ) {
    this.cargarAreas();


  }

  ngOnInit(): void {

  }

  cargarAreas(){
    this.areaService.getEmpresas()
    .pipe(
      map(item=>{
        console.log(item);
        return item.empresas
      })
    )
    .subscribe(
      r=>{
        this.empresas = r
        this.empresasTemp =r
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
