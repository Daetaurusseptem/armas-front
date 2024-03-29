
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area.interface';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { AreaService } from 'src/app/services/area.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { EmpresaService } from 'src/app/services/empresa.service';

import {map} from 'rxjs/operators';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import { TipoExpediente } from 'src/app/interfaces/tipo_expediente.interface';
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-agregar-expediente',
  templateUrl: './agregar-expediente.component.html',
  styleUrls: ['./agregar-expediente.component.css']
})
export class AgregarExpedienteComponent implements OnInit {

  public archivoSubir!:File
  public archivoActualizar!:any
  usuarioModel: UsuarioModel;
  permiso:'l'|'e'
  areaId: string;
  empresaId: string;
  empleadoId:string;
  area: Area;
  empresa: Empresa;
  empleado:Empleado
  tipoExpedientes:TipoExpediente[];
  formSubmitted=false;

  expedienteForm= this.fb.group({
    archivo: ['', [Validators.required]],
    nota: ['', [Validators.required]],
    tipo_expediente: ['', [Validators.required]],
  });


  constructor(
    private empleadoService: EmpleadosService,
    private expedienteService: ExpedientesService,
    private empresasService: EmpresaService,
    private areaService: AreaService,
    private departamentosService: DepartamentoService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router:Router,
    private usuarioService:UsuariosService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.empresaId = params['idEmpresa'];
      this.areaId = params['idArea'];
      this.empleadoId = params['idEmpleado'];



      this.obtenerEmpresa(this.empresaId);
      this.obtenerArea(this.areaId);
      this.obtenerEmpleado(this.empleadoId);
      this.obtenerTiposExpedientes(this.empresaId,this.areaId);
      this.getTipoPermisoUsuario();
    });
  }


  agregarExpediente() {

    console.log('entra');
    // const materiaId =this.registerEmpleadoForm.get('materia').value;
    this.formSubmitted = true;

    if (this.expedienteForm.invalid) {
      console.log(this.archivoSubir);
      console.log('no valido');
      console.log(this.expedienteForm);
      return;
    }


    let idUsuario:string;

    console.log(this.expedienteForm.value);

    const nota = this.expedienteForm.get('nota').value
    const tipo_expediente = this.expedienteForm.get('tipo_expediente').value

    this.expedienteService.subirExpediente(this.empresaId, this.areaId, this.empleadoId,  this.empleado.departamentoId,  this.archivoSubir, nota, tipo_expediente )
    .subscribe(
      resp=>{
        console.log(resp);

           Swal.fire({
             title:'Expediente Agregado'
           })
           if( this.empresaId!== '' || undefined  || null ){
             this.router.navigateByUrl(`/dashboard/${this.empresaId}/${this.areaId}/${this.empleadoId}/expediente`)
            }else{

              this.router.navigateByUrl(`/dashboard/`)
           }

           //   }
           // )
          },err=>{
            console.log(err);
            Swal.fire({
              title:'Hubo un error',
              text:err.error.msg
            })
    }

    )





  }



  cambiarArchivo(file: File): void {
    this.archivoSubir = file;
    if (!file) {
      this.archivoActualizar = null;
      return;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.archivoActualizar = reader.result;
    };
  }





  obtenerTiposExpedientes(idEmpresa: string, idArea:string) {
    this.expedienteService
      .getTipoExpedientesArea(idEmpresa, idArea)
      .pipe(
        map((item) => {
          console.log(item);
          return item.tiposExpediente;
        })
      )
      .subscribe((tiposExpediente) => {
        this.tipoExpedientes = tiposExpediente;
        console.log(tiposExpediente);
      });
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
  obtenerEmpleado(id: string) {
    this.empleadoService
      .getEmpleado(id)
      .pipe(
        map((item) => {
          return item.empleado;
        })
      )
      .subscribe((empleado) => {
        this.empleado = empleado;
      });
  }
  obtenerEmpresa(id: string) {
    this.empresasService
      .getEmpresa(id)
      .pipe(
        map((item) => {
          return item.empresa;
        })
      )
      .subscribe((empresa) => {
        this.empresa = empresa;
      });
  }
  campoNoValido(campo:string):boolean{
    if ( this.expedienteForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
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
