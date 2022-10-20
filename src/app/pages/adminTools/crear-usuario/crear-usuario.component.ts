import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  formSubmitted=false;
  // materias:materias[]=[];

  public registerUsuarioForm = this.fb.group({
    nombre:['', Validators.required],
    usuario:['',Validators.required],
    // email:['', [Validators.email, Validators.required]],
    password:['', [Validators.required]],
    password2:['', [Validators.required]],
    actualizo:['admin', [Validators.required]]

  },
  {
    validators:this.passwordsIguales('password','password2')}
  )


  constructor(
              private fb: FormBuilder,
              private usuariosService:UsuariosService,
              private router:Router
    ) {

     }

  ngOnInit(): void {
  }

  createUser() {

    console.log('entra');
    // const materiaId =this.registerUsuarioForm.get('materia').value;
    this.formSubmitted = true;

    if (this.registerUsuarioForm.invalid) {
      console.log('no valido');
      console.log(this.registerUsuarioForm);
      return;
    }

    let idUsuario:string;

    this.usuariosService.createUser(this.registerUsuarioForm.value)
    .subscribe(
      resp=>{
        console.log(resp);

      // idUsuario= resp.id
      // console.log(idUsuario);
      // return this.usuariosService.addMaestroMateria(materiaId, idUsuario)
      // .subscribe(
      //   resp=>{
           Swal.fire({
             title:'Usuario creado'
           })

           this.router.navigateByUrl('dashboard/usuarios')

      //   }
      // )
    }
    )





  }

//ESCENCIALES
  contrasenasNoValidas() {
    const pass1 = this.registerUsuarioForm.get('password')?.value;
    const pass2 = this.registerUsuarioForm.get('password2')?.value;

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
    if ( this.registerUsuarioForm.get(campo)?.invalid && this.formSubmitted ) {
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
