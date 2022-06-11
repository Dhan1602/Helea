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
    userDescripcion: undefined,
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

  goProfile(){
    this.linkPerfil.rect(this.perfile._id)
  }

  createRedirect() {
    this._router.navigate(["/create"]);
  }

  viewNavPerfil(){
    if(this.disployNav){
      this.disployNav = false;
      let heightNav = document.querySelector("nav")?.offsetHeight;
    }else{
      this.disployNav = true;
    }
  }

  editarPerfil(){
    this._router.navigate(["modificarPerfil/" + this.perfile._id ])
  }

  singOut(){
    let cerrar = confirm("¿Deseas cerrar sesión?");
    if(cerrar){
      let ip = this.servidor.getIPreferences(false);
      this.servidor.deslogear(ip).subscribe({
        next: (r2: any) => {
          this._router.navigate(["/feed"]);
        },
        error: (e2: any) => {
          console.log(e2);
        }
      });
    }
  }


}
