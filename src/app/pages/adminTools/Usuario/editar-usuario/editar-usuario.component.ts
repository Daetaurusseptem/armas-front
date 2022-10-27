
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/interfaces/area.interface';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuario!: Usuario;
  areas!: Area[];
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

  permisosForm = this.fb.group({
    idArea:['', [Validators.required]],
    tipo:['', [Validators.required]]
  })


  constructor(
              private activatedRoute:ActivatedRoute,
              private usuariosService:UsuariosService,
              private areasService:AreaService,
              private permisosService:PermisosService,
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
          this.obtenerAreas();
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
  actualizarPermiso(){
    this.formSubmitted=true
    if(this.permisosForm.invalid && this.formSubmitted){
      return
    }
    Swal.fire({
      title:'estas seguro?',
      icon:'question'
    })
    .then(resp=>{
      if(resp.isConfirmed){
        const { idArea, tipo}= this.permisosForm.value
        this.permisosService.updateUser(idArea, this.usuario.id, tipo )
        .subscribe(r=>{
          console.log(r);
          this.formSubmitted = false;

        })
      }
    })


  }
  eliminarPermiso(areaId:string){

    Swal.fire({
      title:'estas seguro?',
      icon:'question'
    })
    .then(resp=>{
      if(resp.isConfirmed){

        this.permisosService.updateUser(areaId, this.usuario.id, 'l' )
        .subscribe(r=>{
          console.log(r);
          this.formSubmitted = false;

        })
      }
    })


  }
  obtenerAreas(){
    this.areasService.getAreas()
    .pipe(
      map(item=>{
        return item.areas
      })
    )
    .subscribe(r=>{
      let filtroPermisos:any[]=[];
      this.usuario.Areas.forEach(e=>{
        console.log(e);
       filtroPermisos.push(e.Permisos.areaId)
      })

      const permisosFiltrados = r.filter(obj => {

        console.log('permisos que no quiero en mi array final', filtroPermisos);
        if(filtroPermisos.includes(obj.id)){
          return ''
        }else{
          return obj
        }
      });
      console.log('array que quiero obtener: ', permisosFiltrados);

      this.areas =permisosFiltrados
      console.log(this.areas);
    })

  }

  guardarUsuario(){

    this.formSubmitted=true
    if(this.usuarioForm.invalid && this.formSubmitted){
      return
    }

    console.log(this.usuario.id);
    Swal.fire({
      title:'estas seguro?',
      icon:'question'
    })
    .then(resp=>{
      if(resp.isConfirmed){

        this.usuariosService.updateUser(this.usuario.id, this.usuarioForm.value)
        .subscribe(r=>{
          this.formSubmitted = false;
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
          this.formSubmitted=false
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