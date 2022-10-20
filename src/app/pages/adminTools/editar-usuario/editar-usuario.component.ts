import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuario!: Usuario;
  idUsuario:string;
  formSubmitted=false;

  usuarioForm = this.fb.group({
    nombre:['',[Validators.required]],
    usuario:['',[Validators.required]],
  })
  passwordForm = this.fb.group({
    password:['',[Validators.required]],
    password2:['',[Validators.required]],
  },
  {
    validators:[this.passwordsIguales('password','password2')]
  }
  )

  opcionesPermisos = this.fb.group({
    id:['']
  })


  constructor(
              private activatedRoute:ActivatedRoute,
              private usuariosService:UsuariosService,
              private fb:FormBuilder,
              private router:Router
              ) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params['id']);
      this.obtenerUsuario(params['id']).subscribe(
        usuario=>{
          this.usuario = usuario

          this.usuarioForm.setValue({
            nombre: this.usuario.nombre,
            usuario: this.usuario.usuario,
          })

        }
      )
    })
  }



  obtenerUsuario(id:string){
    return this.usuariosService.getUsuario(id)
    .pipe(
      map(item=>{
        return item.usuario
      })
    )
  }

  guardarUsuario(){



    console.log(this.usuario.id);
    Swal.fire({
      title:'estas seguro?',
      icon:'question'
    })
    .then(resp=>{
      if(resp.isConfirmed){

        this.usuariosService.updateUser(this.usuario.id, this.usuarioForm.value)
        .subscribe(r=>{
          this.router.navigateByUrl('/dashboard/usuarios')
        })
      }
    })
  }
  guardarPassword(){
    console.log(this.passwordForm);
    this.formSubmitted=true
    if(this.passwordForm.invalid && this.formSubmitted){
      return
    }

    Swal.fire({
      title:'estas seguro?',
      icon:'question'
    })
    .then(resp=>{
      if(resp.isConfirmed){



        this.usuariosService.updateUser(this.usuario.id, this.passwordForm.value)
        .subscribe(r=>{
          console.log(r);
        })
      }
    })
  }


//ESCENCIALES
   contrasenasNoValidas() {
     const pass1 = this.passwordForm.get('password')?.value;
     const pass2 = this.passwordForm.get('password2')?.value;
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

      if ( pass1Control!.value == pass2Control!.value ) {
        pass2Control!.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }


    }
  }

   campoNoValidoPassword(campo:string):boolean{
     if ( this.passwordForm.get(campo)?.invalid && this.formSubmitted ) {
       return true;
     } else {
       return false;
     }
   }
   campoNoValidoDatosUsuario(campo:string):boolean{
     if ( this.usuarioForm.get(campo)?.invalid && this.formSubmitted ) {
       return true;
     } else {
       return false;
     }
   }

 }
