import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  formSubmitted=false;


  public registerEmpleadoForm = this.fb.group({
    nombre:['', Validators.required],
    numero_empleado:['',Validators.required],
    jefeId:['', [Validators.required]],
    departamentoId:['', [Validators.required]],
    empresaId:['', [Validators.required]],
    status:[true, [Validators.required]],
    actualizo:['admin', [Validators.required]],

  }
  )


  constructor(
              private fb: FormBuilder,
              private empleadosService:EmpleadosService,
              private router:Router
    ) {

     }

  ngOnInit(): void {
  }

  createEmpleado() {

    console.log('entra');
    // const materiaId =this.registerEmpleadoForm.get('materia').value;
    this.formSubmitted = true;

    if (this.registerEmpleadoForm.invalid) {
      console.log('no valido');
      console.log(this.registerEmpleadoForm);
      return;
    }

    let idUsuario:string;

    this.empleadosService.createEmpleado(this.registerEmpleadoForm.value)
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


  campoNoValido(campo:string):boolean{
    if ( this.registerEmpleadoForm.get(campo)?.invalid && this.formSubmitted ) {
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
