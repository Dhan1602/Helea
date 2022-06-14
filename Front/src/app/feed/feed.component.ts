import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router"
import { Rutasss } from '../logicaExterna/router';

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

  searchPlaceholder = "Busca un nombre o una palabra clave";

  searchValue = "";

  nameParam = this.route.snapshot.params["name"];

  encontrados: Boolean = true

  btnTxt = "Buscar";

  busquedaResponse = {
    cantidadT: 0,
    cantidadC: 0,
    busqueda: ""
  }

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

  red(param: any) {
    this.direccionar.rect(param);
  }

  filtro(filtro: any) {
    if (filtro.value == "Mostrar todos") {
      this.opcion = 0;
      this.searchPlaceholder = "Busca un nombre o una palabra clave";
      this.getContent();
      this.encontrados = true;
      this.btnTxt = "Buscar"
      document.querySelector("#btnSearch")?.classList.remove("categOrAuth")
      this.searchValue = ""
    } else if (filtro.value == "Categorías") {
      this.opcion = 1;
      this.peticiones.documentos = [];
      this.searchPlaceholder = "Busca una categoría";
      this.getCategory();
      this.encontrados = true;
      document.querySelector("#btnSearch")?.classList.add("categOrAuth")
      this.btnTxt = "Buscar categoría"
      this.searchValue = ""
    } else if (filtro.value == "Autores") {
      this.opcion = 2;
      this.peticiones.documentos = [];
      this.peticiones.doccategorias = [];
      this.searchPlaceholder = "Busca un autor";
      this.getProfile();
      this.encontrados = true;
      document.querySelector("#btnSearch")?.classList.add("categOrAuth")
      this.btnTxt = "Buscar autor"
      this.searchValue = ""
    }
  }

  createRedirect() {
    this._router.navigate(["create"]);
  }

  buscar(search: any) {
    if (this.opcion == 0 || this.opcion == 3 ) {
      if (search.value != "") {
        this.peticiones.searchOne(search.value).subscribe({
          next: (res: any) => {
              this.opcion = 3;
              this.encontrados = true;
              this.peticiones.documentos = res.titulo;
              this.peticiones.docContent = res.contenido;
              this.busquedaResponse.cantidadT = res.titulo.length;
              this.busquedaResponse.cantidadC = res.contenido.length;
              this.busquedaResponse.busqueda = (res.busqueda.substring(0, 1).toUpperCase())+(res.busqueda.substring(1));
              this.searchValue = "";
          },
          error: (err) => console.log(err),
        });
      } else {
        this.opcion = 0;
        this.getContent();
        this.encontrados = true;
      }
    } else if (this.opcion == 1) {
      if (search.value != "") {
        this.peticiones.searchTwo(search.value).subscribe({
          next: (res) => {
            if (res.length > 0) {
              this.encontrados = true;
              this.peticiones.doccategorias = res;
              this.searchValue = "";
            } else {
              this.encontrados = false;
            }
          },
          error: (err) => console.log(err),
        });
      } else {
        this.getCategory();
        this.encontrados = true;
      }

    } else if (this.opcion == 2) {
      if (search.value != "") {
        this.peticiones.searchThree(search.value).subscribe({
          next: (res) => {
            if (res.length > 0) {
              this.encontrados = true;
              this.peticiones.docPerfiles = res;
              this.searchValue = "";
            } else {
              this.encontrados = false;
            }
          },
          error: (err) => console.log(err),
        });
      } else {
        this.getProfile();
        this.encontrados = true;
      }
    };

  };

}
