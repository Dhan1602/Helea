import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(public peticiones: PublicacionesService) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent() {
    this.peticiones.getPost().subscribe({
      next: (res) => {
        this.peticiones.documentos = res;
        console.log(res)
      },
      error: (err) => console.log(err),
    });
  }

  filtro(filtro: any) {
    if (filtro.value == "Mostrar todos") {
      this.getContent();
      console.log(filtro.value)
    } else if (filtro.value == "Categorías") {
        console.log(filtro.value)
        this.peticiones.getCategories().subscribe({
          next: (res) => {
            console.log(res);
            this.peticiones.doccategorias = res;
          },
          error: (err) => console.log(err),
      });
    }else console.log(filtro.value)
  }

}
