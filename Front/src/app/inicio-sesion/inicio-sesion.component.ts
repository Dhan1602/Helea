import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
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
      if(r.noExiste) alert("No se ha podido niciar sesion, verifique que todo esté correctamente");
      else this.router.navigate(['feed']);
    },
    error: e=>{
      console.log(e);
    }});
  }
}
