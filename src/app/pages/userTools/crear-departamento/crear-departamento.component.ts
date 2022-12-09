import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-crear-departamento',
  templateUrl: './crear-departamento.component.html',
  styleUrls: ['./crear-departamento.component.css']
})
export class CrearDepartamentoComponent implements OnInit {
  formSubmitted=false;

  empresaId:string
  areaId:string


  public registerDepartamentoForm = this.fb.group({
    id:['', [Validators.required, Validators.minLength(5), Validators.maxLength(8), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    nombre:['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    empresaId:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    descripcion:['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]]
  }
  )


  constructor(
              private fb: FormBuilder,
              private departamentoService:DepartamentoService,
              private empresaService:EmpresaService,
              private router:Router,
              private usuarioService: UsuariosService,
              private activatedRoute: ActivatedRoute
    ) {

     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{

      this.areaId=params['idArea']
      this.empresaId=params['idEmpresa']
      this.registerDepartamentoForm.get('empresaId').setValue(this.empresaId)
    })
  }

  createDepartamentoArea() {

    // const materiaId =this.registerEmpresaForm.get('materia').value;
    this.formSubmitted = true;
    console.log(this.registerDepartamentoForm.get('empresaId').value);
    if (this.registerDepartamentoForm.invalid && this.formSubmitted ) {
      console.log('no valido');
      console.log(this.registerDepartamentoForm.value);
      return;
    }


    this.departamentoService.createDepartamento(this.registerDepartamentoForm.value)
    .subscribe(
      resp=>{
        console.log(resp);
           Swal.fire({
             title:'Departamento creada'
           })

           this.router.navigateByUrl(`dashboard/${this.empresaId}/${this.areaId}/empleados-area`)

      //   }
      // )
    },
    err=>{
      Swal.fire({
        title:'Hubo un error: '+err.error.msg
      })
    }
    )





  }



//ESCENCIALES

  campoNoValido(campo:string):boolean{
    console.log(campo+': '+this.registerDepartamentoForm.get(campo).valid);
    if ( this.registerDepartamentoForm.get(campo)?.invalid ) {
      return true;
    } else {
      return false;
    }
  }

}
