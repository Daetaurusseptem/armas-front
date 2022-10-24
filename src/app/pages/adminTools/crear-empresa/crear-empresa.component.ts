import { EmpresaService } from './../../../services/empresa.service';
import { Router } from '@angular/router';
import { UsuariosService } from './../../../services/usuarios.service';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {


  formSubmitted=false;
  // materias:materias[]=[];

  public registerEmpresaForm = this.fb.group({
    id:['', [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    nombre:['',[Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
    descripcion:['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
    actualizo:['admin', [Validators.required]]

  },
  {
    validators:this.passwordsIguales('password','password2')}
  )


  constructor(
              private fb: FormBuilder,
              private usuariosService:UsuariosService,
              private empresasService:EmpresaService,
              private router:Router
    ) {

     }

  ngOnInit(): void {
  }

  createUser() {

    console.log('entra');
    // const materiaId =this.registerEmpresaForm.get('materia').value;
    this.formSubmitted = true;

    if (this.registerEmpresaForm.invalid) {
      console.log('no valido');
      console.log(this.registerEmpresaForm);
      return;
    }

    let idUsuario:string;

    this.empresasService.createEmpresa(this.registerEmpresaForm.value)
    .subscribe(
      resp=>{
        console.log(resp);
           Swal.fire({
             title:'Empresa creada'
           })

           this.router.navigateByUrl('dashboard/empresas')

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
  contrasenasNoValidas() {
    const pass1 = this.registerEmpresaForm.get('password')?.value;
    const pass2 = this.registerEmpresaForm.get('password2')?.value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }
  passwordsIguales(pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }


    }
  }
  campoNoValido(campo:string):boolean{
    if ( this.registerEmpresaForm.get(campo)?.invalid && this.formSubmitted ) {
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
}
