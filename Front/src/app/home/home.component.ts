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

  constructor(public peticiones: PublicacionesService, private _router: Router) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(){
    this.peticiones.getPost().subscribe({
      next: (res) => {
      this.peticiones.documentos = res;
      for(let i = 0; i<4; i++){
        this.descCorta1 = this.peticiones.documentos[i].descripcion.substring(0, 30) + "..."
        this.descripciones.push(this.descCorta1)
      }
      },
      error: (err) => console.log(err),
      });
     
  }

  verMas(param: any){
    this._router.navigate(["/verMas/"+param])
  }

}
