import { AreaService } from 'src/app/services/area.service';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';

import  Swal from 'sweetalert2';


import {map} from 'rxjs/operators';
@Component({
  selector: 'app-crear-tipo-expedientes',
  templateUrl: './crear-tipo-expedientes.component.html',
  styleUrls: ['./crear-tipo-expedientes.component.css']
})
export class CrearTipoExpedientesComponent implements OnInit {

  formSubmitted=false;
  empresaId:string;
  areaId:string;
  areasEmpresa:string


  public crearTipoExpedienteForm = this.fb.group({
    tipo:['', [Validators.required, Validators.minLength(2),Validators.maxLength(50)]],
    descripcion:['',[Validators.required, Validators.minLength(5),Validators.maxLength(30)]],
    obligatorio:[false,Validators.required]
  }
  )


  constructor(
              private fb: FormBuilder,
              private areasService:AreaService,
              private expedientesService:ExpedientesService,
              private router:Router,
              private activatedRouter:ActivatedRoute,

    ) {


     }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      this.areaId= params['idArea']
      this.empresaId= params['idEmpresa']
    })

  }


  obtenerAreasEmpresa(empresaID:string){
    this.areasService.getAreasEmpresa(empresaID)
    .pipe(map(item=>item.areas))
    .subscribe(areas=>{

    })
  }





  createTipoExpe() {

    console.log('entra');
    // const materiaId =this.registerUsuarioForm.get('materia').value;
    this.formSubmitted = true;

    if (this.crearTipoExpedienteForm.invalid) {
      console.log('no valido');
      console.log(this.crearTipoExpedienteForm);
      return;
    }


    let idUsuario:string;
    const data={
      tipo:this.crearTipoExpedienteForm.get('tipo').value,
      descripcion:this.crearTipoExpedienteForm.get('descripcion').value,
      obligatorio:this.crearTipoExpedienteForm.get('obligatorio').value,
      areaId:this.areaId,
    }
    this.expedientesService.crearTipoExpediente(this.empresaId, this.areaId, data)
    .subscribe(
      resp=>{
        console.log(resp);

           Swal.fire({
             title:'Usuario creado'
           })

           this.router.navigateByUrl('dashboard/admin/usuarios')

      //   }
      // )
    }
    )





  }



//ESCENCIALES

  campoNoValido(campo:string):boolean{
    if ( this.crearTipoExpedienteForm.get(campo)?.invalid ) {
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

}
