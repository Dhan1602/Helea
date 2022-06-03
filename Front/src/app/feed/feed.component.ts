import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(public peticiones: PublicacionesService) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(){
    this.peticiones.getPost().subscribe({
      next: (res) => {
      console.log(res);
      this.peticiones.documentos = res;
      },
      error: (err) => console.log(err),
      });
  }

}
