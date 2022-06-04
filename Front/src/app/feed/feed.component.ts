import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(public peticiones: PublicacionesService, private _router: Router) { }

  opcion = 0;

  ngOnInit(): void {
    this.getContent();
    this.getCategory();
  }

  getContent() {
    this.peticiones.getPost().subscribe({
      next: (res) => {
        this.peticiones.documentos = res;
      },
      error: (err) => console.log(err),
    });
  }

  getCategory(){
    this.peticiones.getCategories().subscribe({
      next: (res) => {
        this.peticiones.doccategorias = res;
      },
      error: (err) => console.log(err),
    });
  }

  filtro(filtro: any) {
    if (filtro.value == "Mostrar todos") {
      this.opcion = 0;
    } else if (filtro.value == "Categorías") {
      this.opcion = 1;
    }else console.log(filtro.value)
  }

}
