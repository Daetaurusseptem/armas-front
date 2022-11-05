import { Empresa } from './../../../interfaces/empresa.interface';
import { BusquedaService } from './../../../services/busqueda.service';
import { EmpresaService } from './../../../services/empresa.service';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-seleccion-empresa',
  templateUrl: './seleccion-empresa.component.html',
  styleUrls: ['./seleccion-empresa.component.css']
})
export class SeleccionEmpresaComponent implements OnInit {
  empresasConPermisos: any[] = [];
  empresas: Empresa[] = [];
  empresasTemp: Empresa[] = [];

  usuarioModel:UsuarioModel

  constructor(
              private empresasService:EmpresaService,
              private busquedaService:BusquedaService,
              private usuarioService:UsuariosService
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



        return item.empresas
      })
    )
    .subscribe(
      (r:Empresa[])=>{


        this.usuarioModel = this.usuarioService.usuario
        //obtener array de empresas en las que cuenta algun tipo de permiso
        this.usuarioModel.Areas.map(r=>{
          this.empresasConPermisos.push(r.empresaId)
        })

        this.empresas = r.filter( i =>
          this.empresasConPermisos.includes( i.id )
          );
        this.empresasTemp = this.empresas


        console.info('Empresas permitidas' ,this.empresas );


      }
    )
  }



}
