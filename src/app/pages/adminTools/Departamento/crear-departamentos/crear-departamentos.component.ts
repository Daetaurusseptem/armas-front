import { Empresa } from 'src/app/interfaces/empresa.interface';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { DepartamentoService } from './../../../../services/departamento.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-departamentos',
  templateUrl: './crear-departamentos.component.html',
  styleUrls: ['./crear-departamentos.component.css']
})
export class CrearDepartamentosComponent implements OnInit {
  formSubmitted=false;
  empresas:Empresa[]=[];

  public registerDepartamentoForm = this.fb.group({
    id:['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    empresaId:['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    nombre:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    descripcion:['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
    actualizo:['admin', [Validators.required]]
  }
  )


  constructor(
              private fb: FormBuilder,
              private departamentoService:DepartamentoService,
              private empresaService:EmpresaService,
              private router:Router,
              private usuarioService: UsuariosService
    ) {

     }

  ngOnInit(): void {
    this.getEmpresas();
  }

  createArea() {

    console.log('entra');
    this.registerDepartamentoForm.patchValue({actualizo:this.usuarioService.usuario.nombre})
    // const materiaId =this.registerEmpresaForm.get('materia').value;
    this.formSubmitted = true;

    if (this.registerDepartamentoForm.invalid) {
      console.log('no valido');
      console.log(this.registerDepartamentoForm);
      return;
    }

    let idUsuario:string;


    this.departamentoService.createDepartamento(this.registerDepartamentoForm.value)
    .subscribe(
      resp=>{
        console.log(resp);
           Swal.fire({
             title:'Empresa creada'
           })

           this.router.navigateByUrl('dashboard/areas')

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

  getEmpresas(){
    this.empresaService.getEmpresas()
    .pipe(
      map(item=>{
        return item.empresas
      })
    )
    .subscribe(r=>{
      this.empresas = r
    })
  }

//ESCENCIALES

  campoNoValido(campo:string):boolean{
    if ( this.registerDepartamentoForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

}
