import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  descripciones = new Array();
  descCorta1 = "";
  destacados = false;

  constructor(public peticiones: PublicacionesService, private _router: Router) { }

  isLogged: boolean = false;

  ngOnInit(): void {
    this.getContent();
    this.checkLog();
  }

  checkLog(){
    let ip = this.peticiones.getIPreferences(false);
    this.peticiones.verifyLogeo(ip).subscribe({
      next: (r: any) => {
        if (r.estado) {
          this._router.navigate(["/feed"]);
        }
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  getContent(){
    this.peticiones.getPost().subscribe({
      next: (res) => {
      this.peticiones.documentos = res;
      for(let i = 0; i<4; i++){
        this.descCorta1 = this.peticiones.documentos[i].descripcion.substring(0, 30) + "..."
        this.descripciones.push(this.descCorta1)
      }
      this.destacados = true;
      },
      error: (err) => console.log(err),
      });
     
  }

  verMas(param: any){
    this._router.navigate(["/verMas/"+param])
  }

}
