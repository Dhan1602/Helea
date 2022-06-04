import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(public peticiones: PublicacionesService, private _router: Router) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent() {
    this.peticiones.getCategories().subscribe({
      next: (res) => {
        this.peticiones.doccategorias = res;
      },
      error: (err) => console.log(err),
    });
  }

  filtro(filtro: any) {
    if (filtro.value == "Mostrar todos") {
      this._router.navigate(["/feed"]);
    } else if (filtro.value == "Autores") {
      console.log("Autores")
    }
  }
}
