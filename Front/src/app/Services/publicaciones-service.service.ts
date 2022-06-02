import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { post_model } from '../Models/publicaciones';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(private http: HttpClient) {}

  documentos: post_model[] = []

  data: post_model = {
    titulo: "",
    descripcion: "",
    calificacion: 5,
    background: "",
    categoria: "",
    fecha: "",
    autorID: ""
   };
   

  URL_API = "http://localhost:3000"

  createPost(data : post_model){
    return this.http.post(this.URL_API+"/posts", data);
  }

  getPost(){
    return this.http.get<post_model[]>(this.URL_API+"/posts");
  }


}
