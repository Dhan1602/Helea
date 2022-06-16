import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { perfiles } from '../Models/perfiles';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { perfilRutas } from '../logicaExterna/routerPerfil'

@Component({
  selector: 'navBar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
@Injectable({
  providedIn: "root"
})
export class NavBarComponent implements OnInit {
  perfile: perfiles = {
    userName: "",
    userDescripcion: "",
    urlImage: "",
    email: "",
    contrasena: "",
    _id:""
  }
  isLoger: boolean = false;
  disployNav: boolean = false;

  constructor(private _router: Router, private servidor: PublicacionesService, private linkPerfil: perfilRutas) { }

  ngOnInit(): void {
    let ip = this.servidor.getIPreferences(false);
    this.servidor.verifyLogeo(ip).subscribe({
      next: (r: any) => {
        if (r.estado) {
          this.isLoger = true;
          this.servidor.getProfileById(r.userID).subscribe({
            next: (r2: any) => {
              this.perfile = r2;
              let mage:any = document.querySelector("#profilePic");
              mage.addEventListener("click", (e:any)=>{
                e.stopPropagation();
                if(this.disployNav) this.disployNav = false;
                else this.disployNav = true;
              });
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
    let bod:any = document.querySelector("body");
    bod.addEventListener("click", ()=>{
      if(this.disployNav){
        this.disployNav = false;
      }
    });
  }

  goProfile(){
    this.linkPerfil.rect(this.perfile._id);
  }
  goChat(){
    this.linkPerfil.chat(this.perfile._id);
  }

  createRedirect() {
    this._router.navigate(["/create"]);
  }

  editarPerfil(){
    this._router.navigate(["modificarPerfil/" + this.perfile._id ])
  }
  saved(){
    this._router.navigate(["guardados/" + this.perfile._id ])
  }

  singOut(){
    let cerrar = confirm("¿Deseas cerrar sesión?");
    if(cerrar){
      let ip = this.servidor.getIPreferences(false);
      this.servidor.deslogear(ip).subscribe({
        next: (r2: any) => {
          this._router.navigate(["/"]);
        },
        error: (e2: any) => {
          console.log(e2);
        }
      });
    }
  }
}