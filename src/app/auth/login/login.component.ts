import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css'  ]
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    usuario:['', Validators.required],
    password:['',Validators.required]
  })

  constructor(
              private fb:FormBuilder,
              private usuarioService:UsuariosService,
              private router:Router
    ) { }

  ngOnInit(): void {
  }

  login(){
    this.usuarioService.borrarLocalStorage()
    console.log('entro');
    this.usuarioService.login( this.loginForm.value )
    .subscribe( resp => {
        // Navegar al Dashboard

        this.router.navigateByUrl('dashboard');
        console.log(this.router.navigateByUrl('dashboard'));
      }, (err: any) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });

  }

}
