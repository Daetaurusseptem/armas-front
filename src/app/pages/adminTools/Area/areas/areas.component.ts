import { AreaService } from '../../../../services/area.service';
import { Area } from '../../../../interfaces/area.interface';
import { Component, OnInit } from '@angular/core';
import {map, reduce} from 'rxjs/operators';
import { BusquedaService } from 'src/app/services/busqueda.service';
import Swal from 'sweetalert2';
import { binaryResponse } from 'src/app/interfaces/binaryResponse.interface';
import { UtilitiesService } from 'src/app/services/utilities.service';

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
              private busquedaService:BusquedaService,
              private utilitiesService:UtilitiesService
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

  eliminarArea(idArea:string){
    Swal.fire({
      title:'Esta Seguro?',
      text:'Este proceso no se podrá deshacer',
      icon:'warning',
      showCancelButton:true,
      cancelButtonColor:'#F56A52',
      iconColor:'#F56A52',
      allowEnterKey:false

    })
    .then(resp=>{
      if(resp.isConfirmed){
        this.areaService.eliminarArea(idArea)
        .subscribe((resp:binaryResponse)=>{
          console.log(resp);
          if(resp.ok==true){
            Swal.fire({
              title:'Registro eliminado',
              icon:'success'
            })
          }else if(resp.ok==false){
            Swal.fire({
              title:'El registro no pudo ser eliminado',
              icon:'error'
            })
          }
          this.utilitiesService.redirectTo(`/dashboard/admin/areas`)
        }, err=>{
          Swal.fire({
            title:'Registro no eliminado',
            icon:'error',
            text:err.error.msg
          })
        })
      }
    })
  }


}
