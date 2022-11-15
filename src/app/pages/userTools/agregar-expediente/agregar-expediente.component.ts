import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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


@Component({
  selector: 'app-agregar-expediente',
  templateUrl: './agregar-expediente.component.html',
  styleUrls: ['./agregar-expediente.component.css']
})
export class AgregarExpedienteComponent implements OnInit {


  areaId: string;
  empresaId: string;
  empleadoId:string;
  area: Area;
  empresa: Empresa;
  empleado:Empleado
  tipoExpedientes:TipoExpediente[];
  formSubmitted=false;

  expedienteForm= this.fb.group({
    archivo: [null, [Validators.required]],
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
    private fb: FormBuilder
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
    });
  }


  // createEmpleado() {

  //   console.log('entra');
  //   // const materiaId =this.registerEmpleadoForm.get('materia').value;
  //   this.formSubmitted = true;

  //   if (this.expedienteForm.invalid) {
  //     console.log('no valido');
  //     console.log(this.expedienteForm);
  //     return;
  //   }


  //   let idUsuario:string;

  //   console.log(this.expedienteForm.value);

  //   this.expedienteService.subirExpediente(this.empresaId, this.areaId, this.empleadoId, this.expedienteForm)
  //   .subscribe(
  //     resp=>{
  //       console.log(resp);

  //          Swal.fire({
  //            title:'Usuario creado'
  //          })
  //          if( this.empresaId!== '' || undefined  || null ){
  //            this.router.navigateByUrl(`/dashboard/${this.empresaId}/${this.areaId}/empleados-area`)
  //           }else{

  //             this.router.navigateByUrl(`/dashboard`)
  //          }

  //          //   }
  //          // )
  //         },err=>{
  //           console.log(err);
  //           Swal.fire({
  //             title:'Hubo un error',
  //             text:err.error.msg
  //           })
  //   }

  //   )





  // }


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
}
