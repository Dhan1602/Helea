import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(public peticiones: PublicacionesService, private _router: Router, private route : ActivatedRoute) { }

  rating = 3;

  opcion = 0;

  searchPlaceholder = "Ingresa un tema";

  searchValue = "";

  nameParam = this.route.snapshot.params["name"];

  ngOnInit(): void {
    this.getContent();
    this.getCategory();
  }

  getContent() {
    if(this.nameParam == null){
      this.peticiones.getPost().subscribe({
        next: (res) => {
          this.peticiones.documentos = res;
        },
        error: (err) => console.log(err),
      });
    }else{
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

  enter(event: KeyboardEvent, search : any){
    if(event.key == "Enter"){
      this.buscar(search)
    }
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
    } else console.log(filtro.value)
  }

  createRedirect(){
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
      }else{
        this.getCategory();
      }
      
    }
  }

}
