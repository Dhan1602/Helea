import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'Create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public peticiones: PublicacionesService, private router: Router) { }

  //wysiwyg (editor de texto)
  editorConfig: AngularEditorConfig = {
    editable: true,
    sanitize: false,

    toolbarHiddenButtons: [
      ['undo', 'redo', 'strikeThrough', 'subscript', 'superscript', 'indent', 'outdent', 'fontName', 'heading'],
      ['fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'removeFormat',
        'toggleEditorMode',
        'unlink',
        'insertImage',
        'insertVideo'
      ]
    ]
  }

  fecha = ""
  userName = ""
  camposRellenos = true

  ngOnInit(): void {
    this.obtenerDatos();
  }



  obtenerDatos() {
    this.peticiones.getCategories().subscribe({
      next: (res) => {
        this.peticiones.doccategorias = res;
      },
      error: (err) => console.log(err),
    });
  };

  create(form: NgForm) {
    if (this.peticiones.data.titulo == "" || this.peticiones.data.descripcion == ""
      || this.peticiones.data.background == "" || this.peticiones.data.categoria == "") {
      this.camposRellenos = false;
      console.log(this.peticiones.data)
    } else {
      this.camposRellenos = true;
      var confirmacion = confirm("¿Desea confirmar su publicación?")
      if (confirmacion) {
        let ip = this.peticiones.getIPreferences(false);
        this.peticiones.verifyLogeo(ip).subscribe({
          next: (r: any) => { // se hace la verificacion del login
            console.log(r);
            if (r.estado) {
              this.peticiones.getProfileById(r.userID).subscribe({
                next: (res: any) => {
                  let hoy = new Date();
                  this.fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear() + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
                  form.value.fecha = this.fecha;
                  form.value.calificacion = {
                    cantidad: 0,
                    total: 0,
                    promedio: 0
                  };
                  form.value.autor = res.userName
                  form.value.autorId = r.userID
                  this.peticiones.createPost(form.value).subscribe({ //Crear la publicacion
                    next: (res: any) => {
                      alert("Publicado exitosamente!")
                      form.reset();
                      console.log(r);                        
                      this.router.navigate(['feed']);
                    },
                    error: (err) => console.log(err)
                  });
                }, error: (err) => console.log(err)
              })
            }
          },
          error: (e: any) => {
            console.log(e);
          }
        });


      }
    };
  }

}
