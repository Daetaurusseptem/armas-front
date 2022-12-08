import { Empresa } from '../../../../interfaces/empresa.interface';
import { EmpresaService } from '../../../../services/empresa.service';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { BusquedaService } from 'src/app/services/busqueda.service';
import Swal from 'sweetalert2';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { binaryResponse } from 'src/app/interfaces/binaryResponse.interface';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[] = [];
  empresasTemp: Empresa[] = [];


  constructor(
              private empresaService:EmpresaService,
              private busquedaService:BusquedaService,
              private utilitiesService:UtilitiesService
              ) {
    this.cargarAreas();


  }

  ngOnInit(): void {

  }

  cargarAreas(){
    this.empresaService.getEmpresas()
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
    .subscribe( (resultados: Empresa[]) => {
      console.log(resultados);
      this.empresas = resultados;
    });
  }

  eliminarEmpresa(id:string){
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
        this.empresaService.deleteEmpresa(id)
        .subscribe(resp=>{
          console.log('asdasds ' + resp.msg);
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

          this.utilitiesService.redirectTo(`/dashboard/admin/empresas`)
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
