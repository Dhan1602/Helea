import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  nameParam = this.route.snapshot.params["id"];
  temporizador = 0;
  estrellas = 0;
  login = false
  urlImage: String = "";
  public form!: FormGroup;
  pCalificada = false;

  constructor(private fb: FormBuilder, private _router: Router,
    private route: ActivatedRoute, public peticion: PublicacionesService) {
    this.form = this.fb.group({
      rating: ["", Validators.required],
    })
  }


  ngOnInit(): void {
    this.obtenerArticulo();
    this.getSaves();
  }

  getSaves() {
    let ip = this.peticion.getIPreferences(false);
    this.peticion.verifyLogeo(ip).subscribe({
      next: (r: any) => {
        if (r.estado) {
          this.peticion.getProfileById(r.userID).subscribe({
            next: (res: any) => {
              if (res.likes.includes(this.nameParam)) {
                document.getElementById("bookmark")?.classList.toggle("bact")
              }
            },
            error: (err) => { console.log(err) },
          })
        }
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  goAuthor() {
    this._router.navigate(["perfil/" + this.peticion.documentos[0].autorId])
  }

  savePub(element: Element) {
    let ip = this.peticion.getIPreferences(false);
    this.peticion.verifyLogeo(ip).subscribe({
      next: (r: any) => {
        if (r.estado) {
          if (!element.classList.contains("bact")) {
            element.classList.toggle("bact");
            this.peticion.savePublication(r.userID, this.nameParam).subscribe({
              next: (res) => { },
              error: (err) => { console.log(err) }
            })
          } else {
            element.classList.toggle("bact");
            this.peticion.deleteSave(r.userID, this.nameParam).subscribe({
              next: (res) => { },
              error: (err) => { console.log(err) }
            })
          }
        } else {
          alert("Por favor inicie sesión si desea utilizar esta función")
        }
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }


  obtenerArticulo() {
    this.peticion.obtenerArticulo(this.nameParam).subscribe({
      next: (res: any) => {
        this.peticion.documentos = res
        this.temporizador = 1
        this.peticion.getProfileById(res[0].autorId).subscribe({
          next: (res: any) => {
            this.urlImage = res.urlImage
          },
          error: (err) => console.log(err),
        });

      },
      error: (err) => { }
    })
  }

  calificado() {

    let num = (this.form.controls["rating"].value).toString()
    let ip = this.peticion.getIPreferences(false);
    this.peticion.verifyLogeo(ip).subscribe({
      next: (r: any) => {
        if (r.estado) {
          if (this.form.controls["rating"].value > 0 || this.form.controls["rating"].value != 0) {
            this.login = false
            this.peticion.rank(this.nameParam, num).subscribe({
              next: (res) => { this.pCalificada = true },
              error: (err) => { console.log(err) }
            })
          }
        } else {
          this.login = true
        }
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

}
