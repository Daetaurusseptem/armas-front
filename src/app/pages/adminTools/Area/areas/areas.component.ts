import { AreaService } from '../../../../services/area.service';
import { Area } from '../../../../interfaces/area.interface';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  areas: Area[] = [];
  areasTemp: Area[] = [];

  constructor(
              private areaService:AreaService,
              private busquedaService:BusquedaService
              ) {
    this.cargarAreas();


  }

  ngOnInit(): void {

  }

  cargarAreas(){
    this.areaService.getAreas()
    .pipe(
      map(item=>{
        console.log(item);
        return item.areas
      })
    )
    .subscribe(
      r=>{
        this.areas = r
        this.areasTemp = r
      }
    )
  }
  buscar(termino: string): any{

    //si la busqueda es 0 los usuarios guardados en usuarios temp se asignan de nuevo
    if (termino.length === 0 ){
      this.areas = [...this.areasTemp];
      return;
    }

    this.busquedaService.buscar('areas', termino)
    .subscribe( (resultados: any[]) => {
      console.log(resultados);
      this.areas = resultados;
    });
  }

}
