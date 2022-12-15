import { Expediente } from 'src/app/interfaces/empresa.interface copy';
import { Empleado } from './../../../interfaces/empleado.interface';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { EmpleadosService } from './../../../services/empleados.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import {delay, map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/interfaces/area.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { Busqueda } from 'src/app/interfaces/Busqueda.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { itemResponse } from 'src/app/interfaces/itemResponse.interface';
import { ArrayResponse } from 'src/app/interfaces/arrayResponse.interface';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import { TipoExpediente } from 'src/app/interfaces/tipo_expediente.interface';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import Swal from 'sweetalert2';
import { binaryResponse } from 'src/app/interfaces/binaryResponse.interface';
import { UtilitiesService } from 'src/app/services/utilities.service';

const urlFS = environment.urlFileServer

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit, OnDestroy {
  usuarioModel: UsuarioModel;
  permiso:'l'|'e'


  public imgSubs: Subscription;
  urlFotos = `${urlFS}fotos`
  tabSelected ='empleados'
  tiposExpedientesArea:TipoExpediente[]
  empleados: Empleado[] = [];
  empleadosTemp: Empleado[] = [];
  areaId: string;
  empresaId: string;
  area: Area;
  empresa: Empresa;
  departamentoSelected: string;
  departamentos: Departamento[];
  tiposExpedientesObligatorios:TipoExpediente[]=[]
  departamentoBusquedaSelect = this.fb.group({
    departamentoId: ['nodep', [Validators.required]],
    termino: ['', [Validators.required]],
  });
  constructor(
    private empleadoService: EmpleadosService,
    private empresasService: EmpresaService,
    private areaService: AreaService,
    private departamentosService: DepartamentoService,
    private expedientesService: ExpedientesService,
    private busquedaService: BusquedaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalImagenService:ModalImagenService,
    private usuarioService: UsuariosService,
    private utilitiesService: UtilitiesService
  ) {
    this.usuarioModel = this.usuarioService.usuario
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

      this.activatedRoute.params.subscribe((params) => {
      this.empresaId = params['idEmpresa'];
      this.areaId = params['idArea'];
      this.getTiposObligaorios(this.areaId, this.empresaId)
      this.cargarEmpleados(this.empresaId);
      this.obtenerDepartamentos(this.empresaId);
      this.obtenerEmpresa(this.empresaId);
      this.obtenerArea(this.areaId);
      this.getExpedientesArea();
      this.cambioDepartamento();
      this.getTipoPermisoUsuario()

      this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img =>this.cargarEmpleados(this.empresaId));
    });



  }

  getExpedientesArea(){
    this.expedientesService
    .getTipoExpedientesArea(this.empresaId,this.areaId)
    .pipe(
      map((item) => {


        return item.tiposExpediente;
      })
    )
    .subscribe((r) => {
      this.tiposExpedientesArea = r;
    });
  }

  cargarEmpleados(id: string) {
    this.empleadoService
      .getEmpleadosEmpresaId(id)
      .pipe(
        map((item) => {


          return item.empleados;
        })
      )
      .subscribe((r) => {
        this.empleadosTemp = r;
        this.empleados = r;
      });
  }

  buscar(termino?: string): any {





    if (termino.length === 0 && this.departamentoBusquedaSelect.get('departamentoId').value=='nodep'){

      this.empleados = [...this.empleadosTemp];
      return
    }
   //* TERMINO y DEPARTAMENTO
    if(
      this.departamentoBusquedaSelect.get('termino').value !== ''
      &&
      this.departamentoBusquedaSelect.get('departamentoId').value!=='nodep'

      ){
        // console.log('TERMINO y DEPARTAMENTO');
        this.empleadoService.buscarEmpleadoEmpresa(
          this.empresaId,
          this.departamentoBusquedaSelect.get('termino').value,
          this.departamentoSelected
           )
          .pipe(
            map(r=>r.empleados))
          .subscribe(empleados=>this.empleados = empleados)
          return
      }

  //* TERMINO y NO DEPARTAMENTO
  if(
    this.departamentoBusquedaSelect.get('termino').value !== ''
    &&
    (this.departamentoBusquedaSelect.get('departamentoId').value == 'nodep'
    ||
    this.departamentoBusquedaSelect.get('departamentoId').value == ''
    )



    ){
      // console.log('TERMINO y NO DEPARTAMENTO');


      this.empleadoService.buscarEmpleadoEmpresa(
        this.empresaId,
        this.departamentoBusquedaSelect.get('termino').value,
        null
         )
        .pipe(
          map(r=> r.empleados)
        )
        .subscribe(empleados=>{
          this.empleados = empleados
        })




    }
    //* NO TERMINO y SI DEPARTAMENTO
    if(

        this.departamentoBusquedaSelect.get('termino').value == ''|| undefined

      &&
      (this.departamentoBusquedaSelect.get('departamentoId').value !== 'nodep'
      ||
      this.departamentoBusquedaSelect.get('departamentoId').value !== ''
       )

      ){




        this.empleadoService.buscarEmpleadoEmpresa(
          this.empresaId,
          null,
          this.departamentoBusquedaSelect.get('departamentoId').value
           )
          .pipe(
            map(r=>{

              return r.empleados
            })
            )
            .subscribe(empleados=>{
              this.empleados = empleados

          })
      }

  }

  getTiposObligaorios(idArea:string, idEmpresas:string){

    this.expedientesService.getTipoObligatorioExpedientesArea(this.empresaId, this.areaId)
    .pipe(
      map(r=>{

        return r.tiposExpediente})
    )
    .subscribe(tiposObligarios=>{
      this.tiposExpedientesObligatorios = tiposObligarios
    })

  }

  cambioDepartamento() {
    this.departamentoBusquedaSelect
      .get('departamentoId')
      .valueChanges.subscribe((departamento) => {

        this.departamentoSelected = departamento;

          this.buscar(this.departamentoBusquedaSelect.get('termino').value)

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

  obtenerDepartamentos(id: string) {
    this.departamentosService
      .getDepartamentosEmpresa(id)
      .pipe(
        map((r: ArrayResponse) => {

          return r.departamentos;
        })
      )
      .subscribe((departamentos) => {
        this.departamentos = departamentos;
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

  entregado(tipoOb:string, expedientesEmpleado:Expediente[]){
    if(expedientesEmpleado
      .some(exp=>exp.tipo_expediente==tipoOb)){
      return true
    }
    return false
}
changeTab(tab:string){
  this.tabSelected = tab

}


abrirModal( empleado: Empleado ) {
  const {id,numero_empleado,img=''} = empleado
  this.modalImagenService.abrirModal(id,numero_empleado,empleado.Empresa.id, img);
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
        this.utilitiesService.redirectTo(`/dashboard/${this.empresaId}/${this.areaId}/empleados-area`)
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
