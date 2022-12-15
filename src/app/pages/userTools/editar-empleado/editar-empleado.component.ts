import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import { itemResponse } from 'src/app/interfaces/itemResponse.interface';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  empleado!: Empleado;
  areas!: Area[];
  idEmpleado:string;
  formSubmitted=false;
  departamentos:Departamento[]
  empresaSeleccionada:string
  empresaId:string;
  areaId:string;

  constructor(
    private activatedRoute:ActivatedRoute,

    private empleadosService:EmpleadosService,
    private departamentosService:DepartamentoService,
    private fb:FormBuilder,
    private router:Router,
    ) {

}

  empleadoForm = this.fb.group({
    nombre:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    numero_jefe:['',[Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
    departamentoId:['',[Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
    status:[true,[Validators.required]]
  })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.empresaId = params['idEmpresa']
      this.areaId = params['idArea']


      this.obtenerEmpleado(params['idEmpleado'])
    })
  }
  obtenerEmpleado(id:string){
    this.empleadosService.getEmpleado(id)
    .pipe(
      map(item=>{
        console.log(item);
        return item.empleado
      })
      )
    .subscribe(empleado=>{
      this.empleado = empleado
      this.obtenerDepartamentosEmpresa(this.empresaId)
      console.log('empleado: '+ this.empleado);

      this.empleadoForm.get('numero_jefe').patchValue(this.empleado.numero_jefe)
      this.empleadoForm.get('nombre').patchValue(this.empleado.nombre)
      this.empleadoForm.get('status').patchValue(this.empleado.status)
      this.empleadoForm.get('departamentoId').patchValue(this.empleado.Departamento.id)

    })
  }
  guardarEmpleado(){

    this.formSubmitted=true
    if(this.empleadoForm.invalid && this.formSubmitted){
      return
    }

    console.log(this.empleado.id);
    Swal.fire({
      title:'estas seguro?',
      icon:'question'
    })
    .then(resp=>{
      if(resp.isConfirmed){
        this.empleadosService.updateEmpleado(this.empleado.id,this.empleadoForm.value)
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

  obtenerDepartamentosEmpresa(id:string){
    this.departamentosService.getDepartamentosEmpresa(id)
    .pipe(
      map(item=>{
        return item.departamentos
      })
    )
    .subscribe(departamentos=>{
      this.departamentos = departamentos.filter(dep=>{
        if(dep.id==this.empleado.departamentoId){
          return ''
        }else{
          return dep
        }
      })
    })
  }

  campoNoValido(campo:string):boolean{
    if ( this.empleadoForm.get(campo)?.invalid ) {
      return true;
    } else {
      return false;
    }
  }
}
