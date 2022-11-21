import  Swal  from 'sweetalert2';
import { Departamento } from './../../../../interfaces/departamento.interface';
import { DepartamentoService } from './../../../../services/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import {map, min} from 'rxjs/operators';
@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.component.html',
  styleUrls: ['./editar-departamento.component.css']
})
export class EditarDepartamentoComponent implements OnInit {



  departamento!: Departamento;
  iddepartamento:string;
  formSubmitted=false;

  editarDepartamentoForm = this.fb.group({
    nombre:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    descripcion:['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
  })


  opcionesPermisos = this.fb.group({
    id:['']
  })


  constructor(
              private activatedRoute:ActivatedRoute,
              private departamentoService:DepartamentoService,
              private fb:FormBuilder,
              private router:Router
              ) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params['id']);
      this.obtenerdepartamento(params['id']).subscribe(
        departamento=>{
          this.departamento = departamento

          this.editarDepartamentoForm.setValue({
            nombre: this.departamento.nombre,
            descripcion:this.departamento.descripcion
          })

        }
      )
    })
  }



  obtenerdepartamento(id:string){
    return this.departamentoService.getDepartamento(id)
    .pipe(
      map(item=>{
        return item.departamento
      })
    )
  }

  guardarDepartamento(){
    if(this.editarDepartamentoForm.invalid){
      console.log('no valido');
      console.log(this.editarDepartamentoForm);
      return;
    }



    console.log(this.departamento.id);
    Swal.fire({
      title:'estas seguro?',
      icon:'question'
    })
    .then(resp=>{
      if(resp.isConfirmed){

        this.departamentoService.updateDepartamento(this.departamento.id, this.editarDepartamentoForm.value)
        .subscribe(r=>{
          this.formSubmitted = false;
          this.router.navigateByUrl('/dashboard/admin/departamentos')
        })
      }
    })
  }





//ESCENCIALES


   campoNoValido(campo:string):boolean{
     if ( this.editarDepartamentoForm.get(campo)?.invalid ) {
       return true;
     } else {
       return false;
     }
   }
}
