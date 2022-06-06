import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { perfiles } from '../Models/perfiles';
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  perfil: perfiles = {
    userName: "",
    userDescripcion: undefined,
    urlImage: undefined,
    email: "",
    contrasena: ""
  }

  constructor(private servidor: PublicacionesService, private router: Router) { }

  ngOnInit(): void {
  }

  sendPerfil(form: NgForm){
    this.servidor.createPerfil(form.value).subscribe({next: (r:any) => {
      alert(r.response);
      this.router.navigate(['feed']);
    },
    error: e => {
      console.log(e);
    }});
  }
}