import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { perfiles } from '../Models/perfiles';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  perfil: perfiles = {
    userName: "",
    userDescripcion: "",
    urlImage: "",
    email: "",
    contrasena: ""
  }
  error:any = {
    es: false,
    message: ""
  }
  comfirContrasena: any = "";
  urlMod = this.rutaMod.snapshot.params["id"];
  titulo = "Registro";

  constructor(private servidor: PublicacionesService, private router: Router, private rutaMod: ActivatedRoute) { }
  ngOnInit(): void {

    if (this.urlMod) {
      this.modificarPerfil()
    }
  }

  sendPerfil(form: NgForm) {
    if (this.perfil.contrasena.trim() != this.comfirContrasena.trim()) {
      this.error.es = true;
      this.error.message = "Las contraseñas no coinciden";
    
    }else if (this.perfil.userName.trim() == "" || this.perfil.email?.trim() == "" || 
    this.perfil.contrasena?.trim() == "" || this.perfil.userDescripcion?.trim() == "") {
      this.error.es = true;
      this.error.message = "Por favor rellene los campos obligatorios";
    } else {
      this.error.es = false; this.error.message = "";

      if (this.perfil.urlImage?.trim() == null || this.perfil.urlImage?.trim() == "") {
        form.value.urlImage = "https://i.imgur.com/KC1KPDW.png";
      };
      this.servidor.createPerfil(form.value).subscribe({
        next: (r: any) => {
          if(r.error){
            this.error.es = true;
            this.error.message = r.response;
          }else{
            alert(r.response);
            this.servidor.createChat(r.perfilCreado._id).subscribe({
              next: (r2: any) => {
                console.log(r2.response);
              },
              error: (e2: any) => {
                console.log(e2);
              }
            });
  
            let logeo = {
              _id: r.perfilCreado._id,
              _ip: this.servidor.getIPreferences(false),
              userName: r.perfilCreado.userName
            }
            this.servidor.logear(logeo).subscribe({
              next: (r2: any) => {
                if (r2) console.log("se ha logueado con exito");
  
                this.router.navigate(['feed']);
              },
              error: (e2: any) => {
                console.log(e2);
              }
            });
          }
        },
        error: (e: any) => {
          console.log(e);
        }
      });
    }
  };
  isTyping(){
    this.error.es = false;
  }

  modificarPerfil() {

    this.titulo = "Modificar"
    this.servidor.getProfileById(this.urlMod).subscribe({

      next: (res: any) => {

        this.perfil = res
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  actualizarPerfil(formulario: NgForm) {
    if (this.perfil.userName.trim() == "" || this.perfil.email?.trim() == "" || this.perfil.contrasena?.trim() == "") {
      this.error.es = true;
      this.error.message = "Por favor rellene los campos obligatorios";
    } else if (this.perfil.contrasena.trim() != this.comfirContrasena.trim()) {
      this.error.es = true;
      this.error.message = "Las contraseñas no coinciden";
    } else {
      this.error.es = false;
      if (this.perfil.urlImage?.trim() == null || this.perfil.urlImage?.trim() == "") {
        formulario.value.urlImage = "https://i.imgur.com/KC1KPDW.png";
      };
      this.servidor.actPerfil(formulario.value, this.urlMod).subscribe({
        next: (res: any) => {
          this.router.navigate(["feed"])
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

}
