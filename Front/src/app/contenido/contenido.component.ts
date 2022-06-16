import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { comentarios } from '../Models/comentarios';
import { perfiles } from '../Models/perfiles';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  nameParam = this.route.snapshot.params["id"];
  temporizador = 0;
  estrellas = 0;
  errorCalificar: any = {
    mensaje: false,
    estado: false
  }
  urlImage: String = "";
  public form!: FormGroup;
  pCalificada = false;
  mine = false;
  index = 0;

  comments: Array<comentarios> = [{
    idPublicacion: "",
    messages: {
      userName: "",
      image: "",
      message: "",
      fecha: ""
    }
  }]
  userActual: perfiles = {
    userName: "",
    userDescripcion: "",
    email: "",
    contrasena: ""
  }
  autorP: perfiles = {
    userName: "",
    userDescripcion: "",
    email: "",
    contrasena: ""
  }
  messageSend: any = "";
  isLogeado: boolean = false;

  constructor(private fb: FormBuilder, private _router: Router,
    private route: ActivatedRoute, public peticion: PublicacionesService) {
    this.form = this.fb.group({
      rating: ["", Validators.required],
    })
  }


  ngOnInit(): void {
    this.obtenerArticulo();
    this.getSaves();

    let ip = this.peticion.getIPreferences(false);
    this.peticion.verifyLogeo(ip).subscribe({
      next: (r: any) => {
        if (r.estado) {
          this.isLogeado = r.estado;
          this.peticion.getProfileById(r.userID).subscribe({
            next: (r2: any) => {
              this.userActual = r2;
            },
            error: (e2: any) => {
              console.log(e2);
            }
          });
        }
      },
      error: (e: any) => {
        console.log(e);
      }
    });
    this.getComentarios();
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

  deletePost() {
    let option = confirm("¿Deseas eliminar esta publicacion?")
    if (option) {
      this.peticion.deletePost(this.nameParam).subscribe({
        next: (res: any) => { this._router.navigate(["feed"]) },
        error: (err) => console.log(err)
      });
    }
  }


  obtenerArticulo() {
    this.peticion.obtenerArticulo(this.nameParam).subscribe({
      next: (res1: any) => {
        this.peticion.documentos = res1
        this.temporizador = 1
        this.peticion.getProfileById(res1[0].autorId).subscribe({
          next: (res: any) => {
            this.autorP = res;
            this.urlImage = res.urlImage
            let ip = this.peticion.getIPreferences(false);
            this.peticion.verifyLogeo(ip).subscribe({
              next: (r: any) => {
                if (r.estado) {
                  if (r.userID == res1[0].autorId) {
                    this.mine = true
                  }
                }
              },
              error: (e: any) => {
                console.log(e);
              }
            });
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
            this.errorCalificar.estado = false;
            this.peticion.rank(this.nameParam, num, this.userActual._id).subscribe({
              next: (res:any) => {
                if(res.yasTa){
                  this.errorCalificar.estado = true;
                  this.errorCalificar.mensaje = res.mensaje;
                }else this.pCalificada = true;
              },
              error: (err) => { console.log(err) }
            })
          }
        } else {
          this.errorCalificar.estado = true;
          this.errorCalificar.mensaje = false;
        }
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  getComentarios() {
    this.peticion.getComentarios(this.nameParam).subscribe({
      next: (r: any) => {
        console.log(r)
        this.comments = r;
        this.index = r.length
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }
  sendMensaje() {
    let fecha = new Date();
    let cuerpo = {
      idPublicacion: this.nameParam,
      messages: {
        userName: this.userActual.userName,
        image: this.userActual.urlImage,
        message: this.messageSend,
        fecha: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()
      }
    }
    this.messageSend = "";
    this.peticion.newComentario(cuerpo).subscribe({
      next: (r: any) => {
        this.getComentarios();
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }
  eliminarComentario(men: any) {
    let pre = confirm("¿Deseas eliminar este mensaje?");
    if (pre) {
      let id: any
      op: {
        for (let m of this.comments) {
          if (men == m.messages) id = m._id;
        }
      }
      this.peticion.eliminarComentario(id).subscribe({
        next: (r: any) => {
          this.getComentarios();
        },
        error: (e: any) => {
          console.log(e);
        }
      });
    }
  }
}
