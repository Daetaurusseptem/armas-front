import Swal from 'sweetalert2';
import { Empresa } from './../../../interfaces/empresa.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {


  empresa!: Empresa;
  idempresa:string;
  formSubmitted=false;

  editarempresaForm = this.fb.group({
    id:['',[Validators.required]],
    nombre:['',[Validators.required]],
    descripcion:['']
  })


  opcionesPermisos = this.fb.group({
    id:['']
  })


  constructor(
              private activatedRoute:ActivatedRoute,
              private empresaService:EmpresaService,
              private fb:FormBuilder,
              private router:Router
              ) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params['id']);
      this.obtenerempresa(params['id']).subscribe(
        empresa=>{
          this.empresa = empresa

          this.editarempresaForm.setValue({
            id: this.empresa.id,
            nombre: this.empresa.nombre,
            descripcion:this.empresa.descripcion
          })

        }
      )
    })
  }



  obtenerempresa(id:string){
    return this.empresaService.getEmpresa(id)
    .pipe(
      map(item=>{
        return item.empresa
      })
    )
  }

  guardarEmpresa(){



    console.log(this.empresa.id);
    Swal.fire({
      title:'estas seguro?',
      icon:'question'
    })
    .then(resp=>{
      if(resp.isConfirmed){

        this.empresaService.updateEmpresa(this.empresa.id, this.editarempresaForm.value)
        .subscribe(r=>{
          this.router.navigateByUrl('/dashboard/empresa')
        })
      }
    })
  }



//ESCENCIALES


   campoNoValido(campo:string):boolean{
     if ( this.editarempresaForm.get(campo)?.invalid && this.formSubmitted ) {
       return true;
     } else {
       return false;
     }
   }
}
