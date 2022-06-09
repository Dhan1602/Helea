import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../Services/publicaciones-service.service';
import { Rutasss } from '../logicaExterna/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(public peticiones: PublicacionesService, private direccionar: Rutasss) { }

  ngOnInit(): void {
    this.getContent();
  }
  getContent() {

    this.peticiones.getPost().subscribe({
      next: (res) => {
        this.peticiones.documentos = res;
      },
      error: (err) => console.log(err),
    });

  }

  red(param: any){
    this.direccionar.rect(param);
  }

}
