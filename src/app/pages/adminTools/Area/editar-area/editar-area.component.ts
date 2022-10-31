import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from 'src/app/services/area.service';
import {map} from 'rxjs/operators';
import { Area } from 'src/app/interfaces/area.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-area',
  templateUrl: './editar-area.component.html',
  styleUrls: ['./editar-area.component.css']
})
export class EditarAreaComponent implements OnInit {


  area!: Area;
  idarea:string;
  formSubmitted=false;

  editarAreaForm = this.fb.group({
    nombre:['',[Validators.required]],
    descripcion:['']
  })


  opcionesPermisos = this.fb.group({
    id:['']
  })


  constructor(
              private activatedRoute:ActivatedRoute,
              private areaService:AreaService,
              private fb:FormBuilder,
              private router:Router
              ) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params['id']);
      this.obtenerArea(params['id']).subscribe(
        area=>{
          this.area = area
          console.log(area);

          this.editarAreaForm.setValue({
            nombre: this.area.nombre,
            descripcion:this.area.descripcion
          })

        }
      )
    })
  }



  obtenerArea(id:string){
    return this.areaService.getArea(id)
    .pipe(
      map(item=>{
        return item.area
      })
    )
  }

  guardarArea(){



    console.log(this.area.id);
    Swal.fire({
      title:'estas seguro?',
      icon:'question'
    })
    .then(resp=>{
      if(resp.isConfirmed){

        this.areaService.updateArea(this.area.id, this.editarAreaForm.value)
        .subscribe(r=>{
          this.formSubmitted = false;
          this.router.navigateByUrl('/dashboard/areas')
        })
      }
    })
  }



//ESCENCIALES


   campoNoValido(campo:string):boolean{
     if ( this.editarAreaForm.get(campo)?.invalid && this.formSubmitted ) {
       return true;
     } else {
       return false;
     }
   }
}
