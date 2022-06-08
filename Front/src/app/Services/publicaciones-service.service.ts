import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { post_model } from '../Models/publicaciones';
import { categoria_model } from '../Models/categorias';
import { perfiles } from '../Models/perfiles';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(private http: HttpClient) {}

  docPerfiles: perfiles[] = [];
  documentos: post_model[] = [];
  doccategorias: categoria_model[] = [];

  data: post_model = {
    titulo: "",
    descripcion: "",
    calificacion: 0,
    background: "",
    categoria: "",
    fecha: "",
    autorID: ""
   };
   

  URL_API = "http://localhost:3000"

   createPerfil(perfil: perfiles){
     return this.http.post(this.URL_API+"/perfil", perfil);
   }
   createChat(idHeleo: any){
    return this.http.get(this.URL_API+"/newChat/" + idHeleo);
  }

   singIn(user: any){
    return this.http.post(this.URL_API+"/perfil-singIng", user);
  }

  createPost(data : post_model){
    return this.http.post(this.URL_API+"/posts", data);
  }

  getPost(){
    return this.http.get<post_model[]>(this.URL_API+"/posts");
  }

  getCategories(){
    return this.http.get<categoria_model[]>(this.URL_API+"/posts/categories");
  }

  getProfiles(){
    return this.http.get<perfiles[]>(this.URL_API+"/perfiles");
  }

  searchOne(busqueda: any){
    return this.http.get<post_model[]>(this.URL_API+"/searchName/" + busqueda)
  }
  searchTwo(busqueda: any){
    return this.http.get<categoria_model[]>(this.URL_API+"/searchCategory/" + busqueda)
  }
  searchThree(busqueda: any){
    return this.http.get<perfiles[]>(this.URL_API+"/searchByAuthor/" + busqueda)
  }
  getPostByCategory(busqueda: any){
    return this.http.get<post_model[]>(this.URL_API+"/searchByCategory/" + busqueda)
  }
  obtenerArticulo(parametro : any){
    return this.http.get<post_model[]>(this.URL_API+"/searchArticle/"+parametro)
  }

}
