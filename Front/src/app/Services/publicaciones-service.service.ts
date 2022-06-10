import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { post_model } from '../Models/publicaciones';
import { categoria_model } from '../Models/categorias';
import { perfiles } from '../Models/perfiles';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  URL_API = "http://localhost:3000";
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
    autor: "",
    autorId: "",
   };

  constructor(private http: HttpClient) {}

  // logeo ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  logear(logeo:any){
    return this.http.post(this.URL_API+"/logear", logeo);
  }
  verifyLogeo(ip:any){
    return this.http.get(this.URL_API+"/verificarloger/" + ip);
  }
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // verificar cliente ––––––––––––––––––––––––––––––––––––––––––––––––––––––
   getIPreferences(cambiar: boolean){
    if(!cambiar){
      let IPreference = localStorage.getItem("IPreference");
      if(IPreference) return IPreference;
      else{
        localStorage.setItem("IPreference", "1000");
        return "1000";
      }
    }else{
      let IPreference:any = localStorage.getItem("IPreference");
      IPreference = parseInt( IPreference );
      IPreference++;
      localStorage.setItem("IPreference", IPreference+"");
      return IPreference;
    }
   }
   saveIPreferences(ip:any){
     return this.http.get(this.URL_API+"/saveIPreferences/" + ip);
   }
   exitsIPreferences(ip:any){
    return this.http.get(this.URL_API+"/exitsIPreferences/" + ip);
  }
  // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // perfiles ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
   createPerfil(perfil: perfiles){
     return this.http.post(this.URL_API+"/perfil", perfil);
   }
   guardarPublicacion(id: any, idPublicacion: any){
      return this.http.post(this.URL_API+"/perfil/" + id, { idPublicacion});
   }
   singIn(user: any){
    return this.http.post(this.URL_API+"/perfil-singIng", user);
  }
  // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // chat ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
   createChat(idHeleo: any){
    return this.http.get(this.URL_API+"/newChat/" + idHeleo);
  }
  // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

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

  getProfileById(id: any){
    return this.http.get<perfiles[]>(this.URL_API+"/perfiles/"+id);
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
