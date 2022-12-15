import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import {map} from 'rxjs';
import { TipoExpediente } from 'src/app/interfaces/tipo_expediente.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-expediente',
  templateUrl: './editar-tipo-expediente.component.html',
  styleUrls: ['./editar-tipo-expediente.component.css']
})
export class EditarTipoExpedienteComponent implements OnInit {

  tipoExpediente!: TipoExpediente;
  areas!: Area[];
  idTipoExpediente:string;
  formSubmitted=false;
  departamentos:Departamento[]
  empresaSeleccionada:string
  empresaId:string;
  areaId:string;

  constructor(
    private activatedRoute:ActivatedRoute,

    private expedientesService:ExpedientesService,
    private fb:FormBuilder,
    private router:Router,
    ) {

}

  tipoExpedienteForm = this.fb.group({
    tipo:['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    descripcion:['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    obligatorio:[true, [Validators.required]],
  })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.idTipoExpediente = params['idTipoExpediente']
      this.empresaId = params['idEmpresa']
      this.areaId = params['idArea']


      this.obtenerTipoExpediente(params['idTipoExpediente'])
    })
  }
  obtenerTipoExpediente(id:string){
    this.expedientesService.getTipoExpediente(id)
    .pipe(
      map(item=>{
        console.log(item);
        return item.tipoExpediente
      })
      )
    .subscribe(tipo=>{
      this.tipoExpediente = tipo

      console.log('tipo: '+ this.tipoExpediente);
      this.tipoExpedienteForm.get('tipo').patchValue(this.tipoExpediente.tipo)
      this.tipoExpedienteForm.get('descripcion').patchValue(this.tipoExpediente.descripcion)
      this.tipoExpedienteForm.get('obligatorio').patchValue(this.tipoExpediente.obligatorio)


    })
  }
  guardarTipoExpediente(){

    this.formSubmitted=true
    if(this.tipoExpedienteForm.invalid && this.formSubmitted){
      return
    }


    Swal.fire({
      title:'estas seguro?',
      icon:'question'
    })
    .then(resp=>{
      if(resp.isConfirmed){
        this.expedientesService.updateTipoExpediente(this.idTipoExpediente, this.tipoExpedienteForm.value)
        .subscribe(r=>{
          console.log(r);
          Swal.fire({
            title:'Cambios Guardados',
            icon:'success'
          })
          this.formSubmitted = false;

          this.router.navigateByUrl(`/dashboard/${this.empresaId}/${this.areaId}/empleados-area`)
        },
        err=>{
          console.log(err.error.msg);
          Swal.fire({
            title:'Error',
            icon:'error',
            text:err.error.msg
          })
        }
        )
      }
    })
  }

  //Esenciales
  //ESENCIALES

  campoNoValido(campo:string):boolean{
    if ( this.tipoExpedienteForm.get(campo)?.invalid ) {
      return true;
    } else {
      return false;
    }
  }

}
