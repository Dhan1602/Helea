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
    urlImage: "",
    email: "",
    contrasena: ""
  }
  comfirContrasena: any = "";
  camposRellenos: boolean = true;
  contrasenaIgual: boolean = true;

  constructor(private servidor: PublicacionesService, private router: Router) { }
  ngOnInit(): void {
  }

  sendPerfil(form: NgForm){
    if(this.perfil.userName.trim()==""||this.perfil.email?.trim()==""||this.perfil.contrasena?.trim()==""){
      this.camposRellenos = false;
    }else if(this.perfil.contrasena.trim() != this.comfirContrasena.trim()){
      this.contrasenaIgual = false;
    }else{
      this.contrasenaIgual = true;
      if(this.perfil.urlImage?.trim()==null || this.perfil.urlImage?.trim()==""){
        form.value.urlImage = "https://i.imgur.com/KC1KPDW.png";
      };
    this.servidor.createPerfil(form.value).subscribe({next: (r:any) => {
      alert(r.response);
      this.servidor.createChat(r.perfilCreado._id).subscribe({next: (r2:any)=>{
          console.log(r2.response);
        },
        error: (e2:any)=>{
          console.log(e2);
        }
      });
      
      let logeo = {
        _id: r.perfilCreado._id,
        _ip: this.servidor.getIPreferences(false),
        userName: r.perfilCreado.userName
      }
      this.servidor.logear(logeo).subscribe({next: (r2:any)=>{
        if(r2) console.log("se ha logueado con exito");
        
        this.router.navigate(['feed']);
      },
      error: (e2:any)=>{
        console.log(e2);
      }});
    },
    error: (e:any) => {
      console.log(e);
    }});
  }};
}