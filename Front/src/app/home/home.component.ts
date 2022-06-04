import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public peticiones: PublicacionesService) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(){
    this.peticiones.getPost().subscribe({
      next: (res) => {
      this.peticiones.documentos = res;
      },
      error: (err) => console.log(err),
      });
     
  }

}
