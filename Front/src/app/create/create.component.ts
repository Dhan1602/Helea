import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'Create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public peticiones: PublicacionesService) { }

  fecha = ""

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.peticiones.getPost().subscribe({
      next: (res) => {
      console.log(res);
      },
      error: (err) => console.log(err),
      });
     
  }

  create(form: NgForm){
    let hoy = new Date();
    this.fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear() + " " + hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds();
    form.value.fecha = this.fecha;
    this.peticiones.createPost(form.value).subscribe({
      next: (res)=>{
        form.reset();
      },
      error:(err)=>console.log(err)
    });
  }

}
