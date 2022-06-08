import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  nameParam = this.route.snapshot.params["id"];
  temporizador = 0;
  estrellas = 0;

  constructor(private route : ActivatedRoute, public peticion : PublicacionesService) {}

  ngOnInit(): void {
    this.obtenerArticulo();
    // setTimeout(()=>{this.temporizador = 1},210)
  }

  obtenerArticulo(){
    this.peticion.obtenerArticulo(this.nameParam).subscribe({
      next: (res)=>
      {
        this.peticion.documentos = res
        this.temporizador = 1
      },
      error: (err)=>{}
    })
  }

}
