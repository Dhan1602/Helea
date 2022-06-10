import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})

@Injectable({
  providedIn: "root"
})

export class InicioSesionComponent implements OnInit {
  userSingIn = {
    userName: "",
    email: ""
  }

  constructor(private servidor: PublicacionesService, private router: Router) { }

  ngOnInit(): void {
  }

  verificarSingIn(form: NgForm){
    this.servidor.singIn(form.value).subscribe({next: (r:any)=>{
      if(r.noExiste) alert("No se ha podido iniciar sesion, verifique que todo esté correctamente");
      else{
        let logeo = {
          _id: r._id,
          _ip: this.servidor.getIPreferences(false),
          userName: r.userName
        }
        this.servidor.logear(logeo).subscribe({next: (r2:any)=>{
          if(r2) console.log("se ha logueado con exito");
        },
        error: (e2:any)=>{
          console.log(e2);
        }});
        this.router.navigate(['feed']);
      }
    },
    error: e=>{
      console.log(e);
    }});
  }
}
