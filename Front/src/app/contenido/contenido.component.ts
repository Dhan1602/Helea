import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from '@angular/router';
import { post_model } from '../Models/publicaciones';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  nameParam = this.route.snapshot.params["id"];
  temporizador = 0;
  estrellas = 0;
  urlImage: String = ""

  constructor(private _router: Router, private route : ActivatedRoute, public peticion : PublicacionesService) {}

  
  ngOnInit(): void {
    this.obtenerArticulo();
  }

  goAuthor(){
    this._router.navigate(["perfil/"+this.peticion.documentos[0].autorId])
  }

  obtenerArticulo(){
    this.peticion.obtenerArticulo(this.nameParam).subscribe({
      next: (res: any)=>
      {
        this.peticion.documentos = res
        this.temporizador = 1
          this.peticion.getProfileById(res[0].autorId).subscribe({
            next: (res: any) => {
              this.urlImage = res.urlImage
            },
            error: (err) => console.log(err),
          });

      },
      error: (err)=>{}
    })
  }

  calificado(puntuacion: any){
    console.log(puntuacion)
  }

}
