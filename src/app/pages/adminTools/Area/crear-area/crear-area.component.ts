import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { AreaService } from 'src/app/services/area.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-area',
  templateUrl: './crear-area.component.html',
  styleUrls: ['./crear-area.component.css']
})
export class CrearAreaComponent implements OnInit {

  formSubmitted=false;
  empresas:Empresa[]=[];

  public registerAreaForm = this.fb.group({
    id:['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    empresaId:['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    nombre:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    descripcion:['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
    actualizo:['admin', [Validators.required]]
  }
  )


  constructor(
              private fb: FormBuilder,
              private empresasService:EmpresaService,
              private areaService:AreaService,
              private router:Router
    ) {

     }

  ngOnInit(): void {
    this.getEmpresas();
  }

  createArea() {

    console.log('entra');
    // const materiaId =this.registerEmpresaForm.get('materia').value;
    this.formSubmitted = true;

    if (this.registerAreaForm.invalid) {
      console.log('no valido');
      console.log(this.registerAreaForm);
      return;
    }

    let idUsuario:string;

    this.areaService.createArea(this.registerAreaForm.value)
    .subscribe(
      resp=>{
        console.log(resp);
           Swal.fire({
             title:'Area creada'
           })

           this.router.navigateByUrl('dashboard/admin/areas')

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
    this.empresasService.getEmpresas()
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
    if ( this.registerAreaForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

}
