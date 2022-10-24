import { AreaService } from './../../../services/area.service';
import { Area } from './../../../interfaces/area.interface';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  areas: Area[] = [];

  constructor(private areaService:AreaService) {
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
      }
    )
  }

}
