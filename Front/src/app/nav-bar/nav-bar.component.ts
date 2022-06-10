import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { perfiles } from '../Models/perfiles';
import { PublicacionesService } from '../Services/publicaciones-service.service';

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
    publicaciones: [],
    userDescripcion: undefined,
    urlImage: "",
    email: "",
    contrasena: ""
  }
  isLoger: boolean = false;
  disployNav: boolean = false;

  constructor(private _router: Router, private servidor: PublicacionesService) { }

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

  createRedirect() {
    this._router.navigate(["create"]);
  }

  viewNavPerfil(){
    if(this.disployNav){
      this.disployNav = false;
      let heightNav = document.querySelector("nav")?.offsetHeight;
    }else{
      this.disployNav = true;
    }
  }

  singOut(){
    this.viewNavPerfil();
    let cerrar = confirm("¿Deseas cerrar sesión?");
    if(cerrar){
      this.isLoger = false;
      let ip = this.servidor.getIPreferences(false);
      this.servidor.deslogear(ip).subscribe({
        next: (r2: any) => {
          console.log("se ha deslogeado con exito");
        },
        error: (e2: any) => {
          console.log(e2);
        }
      });
    }
  }
}