import { Empresa } from 'src/app/interfaces/empresa.interface';
import { EmpresaService } from 'src/app/services/empresa.service';

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
import { UtilitiesService } from 'src/app/services/utilities.service';

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
  areasUsuario!:Area[]
  empresas:Empresa[]
  empresaSeleccionada:string

  usuarioForm = this.fb.group({
    nombre:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    usuario:['',[Validators.required, Validators.minLength(5), Validators.maxLength(11)]],
  })
  passwordForm = this.fb.group({
    password:['',[Validators.required, Validators.minLength(5), Validators.maxLength(64)]],
    password2:['',[Validators.required, Validators.minLength(5), Validators.maxLength(64)]],
  },
  {
    validators:[this.passwordsIguales('password','password2')]
  }
  )

  empresaSelect = this.fb.group({
    empresa:['', [Validators.required]]
  })


  permisosForm = this.fb.group({
    idArea:['', [Validators.required]],
    tipo:['', [Validators.required]]
  })


  constructor(
              private activatedRoute:ActivatedRoute,
              private usuariosService:UsuariosService,
              private areasService:AreaService,
              private empresaService:EmpresaService,
              private permisosService:PermisosService,
              private fb:FormBuilder,
              private router:Router,
              private utilitiesService:UtilitiesService
              ) {

   }

  ngOnInit(): void {
    this.obtenerEmpresas()
    this.activatedRoute.params.subscribe(params=>{
      console.log(params['id']);
      this.obtenerUsuario(params['id']).subscribe(
        usuario=>{
          this.areasUsuario = usuario.Areas
          this.usuario = usuario
          this.usuarioForm.setValue({
            nombre: this.usuario.nombre,
            usuario: this.usuario.usuario,
          })

        }
      )
    })
    this.permisosForm.get('idArea').valueChanges.subscribe(areaSeleccionada=>{
      console.log(areaSeleccionada);
    })
    this.empresaSelect.get('empresa').valueChanges.subscribe(empresaSeleccionada=>{

      this.obtenerAreas(empresaSeleccionada)
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
          this.hideModal()
          this.utilitiesService.redirectTo(`/dashboard/usuarios/editar-usuario/${this.usuario.id}`)

          Swal.fire({
            title:'Cambios Guardados',
            icon:'success'
          })
        })
      }
    })
    let claseModal = document.querySelector('.modal-open')
    claseModal.classList.remove('.modal-open')
    console.log(claseModal);

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
          this.hideModal()
          this.utilitiesService.redirectTo(`/dashboard/usuarios/editar-usuario/${this.usuario.id}`)
          Swal.fire({
            title:'Cambios Guardados',
            icon:'success'
          })
          let element2 = document.querySelector('.modal-open')

        })
      }
    })


  }

  hideModal(){
    let element = document.getElementById('botonModal')
          element.click()
  }
  obtenerEmpresas(){
    this.empresaService.getEmpresas()
    .pipe(
      map(item=>{
        return item.empresas
      }
      )
    )
    .subscribe(empresas=>{
      this.empresas = empresas
    })
  }
  obtenerAreas(id:string){
    this.areasService.getAreasEmpresa(id)
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

      this.areas = permisosFiltrados
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

          this.formSubmitted=false
          this.utilitiesService.redirectTo(`/dashboard/usuarios/editar-usuario/${this.usuario.id}`)
          let element = document.querySelector('.modal-backdrop')
          element.remove();
          Swal.fire({
            title:'Cambios Guardados',
            icon:'success'
          })


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
          this.utilitiesService.redirectTo(`/dashboard/usuarios/editar-usuario/${this.usuario.id}`)
          let element = document.querySelector('.modal-backdrop')
          element.remove();
          Swal.fire({
            title:'Cambios Guardados',
            icon:'success'
          })
        })
      }
    })

  }


//ESCENCIALES
   contrasenasNoValidas() {
     const pass1 = this.passwordForm.get('password')?.value;
     const pass2 = this.passwordForm.get('password2')?.value;
     if ( (pass1 !== pass2) ) {
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
     if ( this.passwordForm.get(campo)?.invalid) {
       return true;
     } else {
       return false;
     }
   }
   campoNoValidoDatosUsuario(campo:string):boolean{
     if ( this.usuarioForm.get(campo)?.invalid) {
       return true;
     } else {
       return false;
     }
   }

 }
