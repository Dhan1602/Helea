import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router"
import { Rutasss } from '../prueba/prueba';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(public peticiones: PublicacionesService, private _router: Router, private route: ActivatedRoute,
    private direccionar: Rutasss) { }

  index = 0; //Iterador en el for de las cards

  opcion = 0; //Filtro seleccionado

  searchPlaceholder = "Ingresa un tema";

  searchValue = "";

  nameParam = this.route.snapshot.params["name"];

  ngOnInit(): void {
    this.getContent();
    this.getCategory();
    this.getProfile();
  }

  getContent() {
    if (this.nameParam == null) {
      this.peticiones.getPost().subscribe({
        next: (res) => {
          this.peticiones.documentos = res;
        },
        error: (err) => console.log(err),
      });
    } else {
      this.peticiones.getPostByCategory(this.nameParam).subscribe({
        next: (res) => {
          this.peticiones.documentos = res;
        },
        error: (err) => console.log(err),
      });
    }

  }


  getCategory() {
    this.peticiones.getCategories().subscribe({
      next: (res) => {
        this.peticiones.doccategorias = res;
      },
      error: (err) => console.log(err),
    });
  }

  getProfile() {
    this.peticiones.getProfiles().subscribe({
      next: (res) => {
        this.peticiones.docPerfiles = res;
      },
      error: (err) => console.log(err),
    });
  }


  enter(event: KeyboardEvent, search: any) {
    if (event.key == "Enter") {
      this.buscar(search)
    }
  }

  red(param: any){
    this.direccionar.rect(param);
  }

  filtro(filtro: any) {
    if (filtro.value == "Mostrar todos") {
      this.opcion = 0;
      this.searchPlaceholder = "Ingresa un tema";
      this.getContent();
    } else if (filtro.value == "Categorías") {
      this.opcion = 1;
      this.peticiones.documentos = [];
      this.searchPlaceholder = "Ingresa una categoría";
      this.getCategory();
    } else if (filtro.value == "Autores") {
      this.opcion = 2;
      this.peticiones.documentos = [];
      this.peticiones.doccategorias = [];
      this.searchPlaceholder = "Ingresa un autor";
      this.getProfile();
    }
  }

  createRedirect() {
    this._router.navigate(["create"]);
  }

  buscar(search: any) {
    if (this.opcion == 0) {
      if (search.value != "") {
        this.peticiones.searchOne(search.value).subscribe({
          next: (res) => {
            this.peticiones.documentos = res;
            this.searchValue = "";
          },
          error: (err) => console.log(err),

        });
      } else {
        this.getContent();
      }
    } else if (this.opcion == 1) {
      if (search.value != "") {
        this.peticiones.searchTwo(search.value).subscribe({
          next: (res) => {
            this.peticiones.doccategorias = res;
            this.searchValue = "";
          },
          error: (err) => console.log(err),
        });
      } else {
        this.getCategory();
      }

    } else if (this.opcion == 2) {
      if (search.value != "") {
        this.peticiones.searchThree(search.value).subscribe({
          next: (res) => {
            this.peticiones.docPerfiles = res;
            this.searchValue = "";
          },
          error: (err) => console.log(err),
        });
      } else {
        this.getProfile();
      }
    };

  };

}
