import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Rutasss } from '../logicaExterna/router';
import { ActivatedRoute } from '@angular/router';
import { perfiles } from '../Models/perfiles';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: perfiles = {
    userName: "",
    userDescripcion: "",
    urlImage: "",
    email: "",
    contrasena: ""
  }

  constructor(public peticiones: PublicacionesService, private direccionar: Rutasss, private ruta: ActivatedRoute) { }

  parametro = this.ruta.snapshot.params["id"]
  mostrar = false
  logerActual: any = { estado:false, index:-1, userID: null }

  ngOnInit(): void {
    let ip = this.peticiones.getIPreferences(false);
    this.peticiones.verifyLogeo(ip).subscribe({
      next: (r:any)=>{
        this.logerActual = r;
      },
      error: (e:any)=>{
        console.log(e);
      }
    });
    this.getCards();
    this.peticiones.getProfileById(this.parametro).subscribe({
      next: (res: any) => {
        this.mostrar = true
        this.perfil = res;
      },
      error: (err) => console.log(err),
    });
  };

  getCards() {
    this.peticiones.getMyCards(this.parametro).subscribe({
      next: (res) => {
        this.peticiones.documentos = res;
      },
      error: (err) => console.log(err),
    });
  }

  deletePost(id: any, titulo: any){
    let option = confirm('¿Deseas eliminar "'+titulo+'"?')
    if (option) {
      this.peticiones.deletePost(id).subscribe({
        next: (res: any) => {
          alert('"'+titulo+'" se ha eliminado correctamente')
          this.getCards();
        },
        error: (err) => console.log(err)
      });
    }
  }

  red(param: any) {
    this.direccionar.rect(param);
  }

}
