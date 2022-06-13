import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rutasss } from '../logicaExterna/router';
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.component.html',
  styleUrls: ['./guardados.component.css']
})
export class GuardadosComponent implements OnInit {

  constructor(public peticiones: PublicacionesService, private _router: Router, private route: ActivatedRoute,
    private direccionar: Rutasss ) { }

  ngOnInit(): void {
    this.getContent();
  }

  nameParam = this.route.snapshot.params["id"];
  mostrar = false;

  getContent() {
      this.peticiones.getSavedPosts(this.nameParam).subscribe({
        next: (res) => {
          this.peticiones.documentos = res;
          this.mostrar = true
        },
        error: (err) => console.log(err),
      });
  }

  red(param: any){
    this.direccionar.rect(param);
  }

}
