import { Departamento } from 'src/app/interfaces/departamento.interface';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';

import {map} from 'rxjs/operators';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  formSubmitted=false;
  empresaId='';
  empresaSeleccionada='';
  areaId:string
  departamentos:Departamento[];
  empresas:Empresa[];
  departamentoId:string


  public registerEmpleadoForm = this.fb.group({
    nombre:['', Validators.required],
    numero_empleado:['',Validators.required],
    numero_jefe:['', []],
    departamentoId:['', [Validators.required]],
    empresaId:['', [Validators.required]],
    status:[1, [Validators.required]],
    actualizo:['admin', [Validators.required]],

  },
  {
    validators:[this.comprobarExistenciaEmpleado('numero_empleado', 'empresaId')]
  }
  )


  constructor(
              private fb: FormBuilder,
              private empleadosService:EmpleadosService,
              private empresasService:EmpresaService,
              private departamentoService:DepartamentoService,
              private router:Router,
              private activatedRoute: ActivatedRoute
    ) {

      this.registerEmpleadoForm.get('empresaId').valueChanges
      .subscribe(idEmpresa=>{
        this.getDepartamentos(idEmpresa)
      })

     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log('sadasdasdasda',params);
      this.empresaId=params['idEmpresa']||'';
      this.areaId=params['idArea']||'';
      this.departamentoId=params['idDepartamento'] ||'';
      if(this.empresaId){
        this.registerEmpleadoForm.get('empresaId').patchValue(this.empresaId)

        this.getDepartamentos(this.empresaId)
      }

    })

    this.empresaIdDisponible()
    if(this.empresaId===''){
      console.log('No empresa pre seleccionada');
      this.getEmpresas();
    }
  }

  createEmpleado() {

    console.log('entra');
    // const materiaId =this.registerEmpleadoForm.get('materia').value;
    this.formSubmitted = true;

    if (this.registerEmpleadoForm.invalid) {
      console.log('no valido');
      console.log(this.registerEmpleadoForm);
      return;
    }


    let idUsuario:string;

    console.log(this.registerEmpleadoForm.value);

    this.empleadosService.createEmpleado(this.registerEmpleadoForm.value)
    .subscribe(
      resp=>{
        console.log(resp);

           Swal.fire({
             title:'Empleado creado'
           })
           if( this.empresaId!== '' || undefined  || null ){
             this.router.navigateByUrl(`/dashboard/${this.empresaId}/${this.areaId}/empleados-area`)
            }else{

              this.router.navigateByUrl(`/dashboard`)
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


  campoNoValido(campo:string):boolean{
    if ( this.registerEmpleadoForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }
  // cargarMaterias(){
  //   this.materiasService.getMaterias()
  //   .subscribe((items:materias[])=>{
  //    this.materias = items
  //   })
  // }

  empresaIdDisponible(){
    this.activatedRoute.params.subscribe(
      params=>{
        this.empresaId = params['idEmpresa']
        if (this.empresaId === undefined){
          this.empresaId=''
        }
      })
  }

  getDepartamentos(id:string){
    this.departamentoService.getDepartamentosEmpresa(id)
    .pipe(
      map(item=>{
        console.log(item);
        return item.departamentos
      })
    )
    .subscribe(departamentos=>{
      this.departamentos = departamentos
      console.log(departamentos);
    })

  }

  getEmpresas(){
    this.empresasService.getEmpresas()
    .pipe(
      map(item=>{
        return item.empresas
      })
    )
    .subscribe(empresas=>{
      this.empresas=empresas
    })
  }

  existeEmpleadoEmpresa(numero_empleado:string){
    if(this.empresaId==''){
      return null
    }else{
      return this.empleadosService.existeEmpleadoEmpresa(this.empresaId, numero_empleado)
      .pipe(
        map(item=>{
          return item.ok
        })
      )
      .subscribe(resp=>{
        console.log(resp);
        return resp
      })
    }

  }


  comprobarExistenciaEmpleado(numero_empleado: string, idEmpresa:string ) {
    return (formGroup:FormGroup)=>{
      const numeroId = formGroup.get(numero_empleado);
      if(numeroId.value==''){
        return
      }else(
        this.existeEmpleadoEmpresa(numeroId.value)
      )


    }
  }

}
