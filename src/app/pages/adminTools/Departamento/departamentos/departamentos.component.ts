import { BusquedaService } from 'src/app/services/busqueda.service';
import { Departamento } from './../../../../interfaces/departamento.interface';
import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from 'src/app/services/departamento.service';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { binaryResponse } from 'src/app/interfaces/binaryResponse.interface';
import { UtilitiesService } from 'src/app/services/utilities.service';

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
              private busquedaService:BusquedaService,
              private utilitiesService:UtilitiesService
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

  eliminarDepartamento(id:string){
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
        this.departamentosService.deleteDepartamento(id)
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
          this.utilitiesService.redirectTo(`/dashboard/admin/departamentos`)
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

