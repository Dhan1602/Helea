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
      ['undo','redo','strikeThrough','subscript','superscript','indent','outdent','fontName', 'heading'],
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
        let hoy = new Date();
        this.fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear() + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
        form.value.fecha = this.fecha;
        form.value.calificacion = 0;
        this.peticiones.createPost(form.value).subscribe({
          next: (res) => {
            alert("Publicado exitosamente!")
            form.reset();
            this.router.navigate(['feed']);
          },
          error: (err) => console.log(err)
        });
      }
    };
  }

}
