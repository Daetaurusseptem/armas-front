import { DownloadService } from './../../../services/download.service';
import { Area } from './../../../interfaces/area.interface';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from './../../../services/busqueda.service';
import { DepartamentoService } from './../../../services/departamento.service';
import { AreaService } from './../../../services/area.service';
import { EmpresaService } from './../../../services/empresa.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import {map} from 'rxjs/operators';
import { Expediente } from 'src/app/interfaces/empresa.interface copy';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioModel } from 'src/app/models/Usuario.model';

const urlFS = environment.urlFileServer


@Component({
  selector: 'app-expediente-empleado',
  templateUrl: './expediente-empleado.component.html',
  styleUrls: ['./expediente-empleado.component.css']
})
export class ExpedienteEmpleadoComponent implements OnInit {
  usuarioModel: UsuarioModel;
  permiso:'l'|'e'

  usuario:UsuarioModel
  urlFotos = `${urlFS}fotos`
  areaId: string;
  empresaId: string;
  empleadoId: string;
  expedientes:Expediente[]=[]
  empleado:Empleado
  area:Area;

  constructor(

    private expedienteService:ExpedientesService,
    private empleadoService:EmpleadosService,
    private areaService:AreaService,
    private activatedRoute: ActivatedRoute,
    private downloadService:DownloadService,
    private usuarioService:UsuariosService
  ) {
      this.usuario = usuarioService.usuario;
      this.activatedRoute.params.subscribe((params) => {
      this.empresaId = params['idEmpresa'];
      this.areaId = params['idArea'];
      this.empleadoId = params['idEmpleado'];
      this.obtenerEmpleado(this.empleadoId)
      this.obtenerExpedientes(this.empresaId, this.areaId, this.empleadoId)
      this.getTipoPermisoUsuario()

    });
  }

  ngOnInit(): void {

  }


  obtenerExpedientes(idEmpresa:string, idArea:string, idEmpleado:string){
    this.expedienteService.getExpedienteEmpleado(idEmpresa, idArea, idEmpleado)
    .pipe(
      map(item=>{
        console.log(item);
        return item.expedientes
      })
    )
    .subscribe(expedientes=>{
      console.log(expedientes);
      this.expedientes=expedientes
    })
  }
  obtenerEmpleado(idEmpleado:string){
    this.empleadoService.getEmpleado(idEmpleado)
    .pipe(
      map(item=>{
        return item.empleado
      })
    )
      .subscribe(empleado=>{
        this.empleado=empleado
        console.log(empleado);
      })
  }
  obtenerArea(id: string) {
    this.areaService
      .getArea(id)
      .pipe(
        map((item) => {
          return item.area;
        })
      )
      .subscribe((area) => {
        this.area = area;
      });
  }

  download(filePath:string, nombreArchivo:string): void {
    console.log(filePath);
    this.downloadService
      .download(filePath)
      .subscribe(blob => {
        console.log(filePath);
        saveAs(blob, nombreArchivo)
      })
  }
  eliminarExpediente(idExpediente:string){
    Swal.fire({
      title:'Estas Seguro',
      icon:'question'
    })
    .then(r=>{
      if(r.isConfirmed){
        this.expedienteService.eliminarExpediente(idExpediente)
        .subscribe(r=>{
          if(r.ok){

          }
          Swal.fire({
            icon:'success',
            title:r.msg,
          })
        })
      }
    })

  }

  getFoto(foto:string){
    if(foto!=null){

      return `${this.urlFotos}/${foto}`
    }
    return `${this.urlFotos}/no-img.png`
  }
  getTipoPermisoUsuario(){
    this.usuarioModel = this.usuarioService.usuario
    this.usuarioService.getUsuarioTipoPermiso(this.usuarioModel!.id, this.areaId)
    .pipe(map(item=>{

      return item.tipo
    }))
    .subscribe(tipo=>{
      this.permiso = tipo
      console.log(this.permiso);
    })
  }
}


