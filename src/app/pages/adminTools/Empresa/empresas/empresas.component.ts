import { Empresa } from '../../../../interfaces/empresa.interface';
import { EmpresaService } from '../../../../services/empresa.service';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[] = [];

  constructor(private areaService:EmpresaService) {
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
      }
    )
  }
}
