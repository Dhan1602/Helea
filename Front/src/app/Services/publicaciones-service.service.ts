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
  docContent: post_model[] = [];
  doccategorias: categoria_model[] = [];

  data: post_model = {
    titulo: "",
    tituloC: "",
    descripcion: "",
    calificacion: {
      cantidad: 0,
      total: 0,
      promedio:0
    },
    background: "",
    categoria: "",
    fecha: "",
    autor: "",
    autorId: "",
   };

  constructor(private http: HttpClient) {}

  // comentarios –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  getComentarios(idpublic: any){
    return this.http.get(this.URL_API+"/comentarios/" + idpublic);
  }
  newComentario(cuerpo:any){
    return this.http.post(this.URL_API+"/comentario", cuerpo);
  }
  eliminarComentario(id: any){
    return this.http.get(this.URL_API+"/comentario/" + id);
  }
  // logeo ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  logear(logeo:any){
    return this.http.post(this.URL_API+"/logear", logeo);
  }
  deslogear(ip:any){
    return this.http.get(this.URL_API+"/deslogear/" + ip);
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
  cargarChat(heleo: any){
    return this.http.get(this.URL_API+"/cargarChat/" + heleo);
  }
  saveMessage(id: any,cuerpo: any){
    return this.http.post(this.URL_API+"/saveMessage/" + id, cuerpo);
  }
  verCambios(){
    return this.http.get(this.URL_API+"/verCambios");
  }
  newCategory(id:any, cuerpo:any){
    return this.http.post(this.URL_API+"/newCategory/" + id, cuerpo);
  }
  eliminarMensaje(id:any, categoria:any, nuevoArray:any){
    return this.http.post(this.URL_API+"/eliminarMensaje/" + id, { categoria, nuevoArray });
  }
  eliminarCategoria(id:any, nuevoArray:any){
    return this.http.post(this.URL_API+"/eliminarCategoria/" + id, { nuevoArray });
  }
  // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  savePublication(id: any, publicacion:any){
    return this.http.post(this.URL_API+"/saveMine/"+id, {"publicacion":publicacion})
  }
  deleteSave(id: any, publicacion:any){
    return this.http.post(this.URL_API+"/deleteSave/"+id, {"publicacion":publicacion})
  }

  createPost(data : post_model){
    return this.http.post(this.URL_API+"/posts", data);
  }

  getPost(){
    return this.http.get<post_model[]>(this.URL_API+"/posts");
  }

  deletePost(id: any){
    return this.http.delete(this.URL_API+"/delete/"+id);
  }

  getSavedPosts(id: any){
    return this.http.get<post_model[]>(this.URL_API+"/savedPosts/"+id);
  }

  getMyCards(perfiles: any){
    return this.http.get <post_model[]>(this.URL_API+"/tarjetas/" +perfiles);
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
  actPerfil(formulario: perfiles, id: any){
    return this.http.put(this.URL_API+"/modificarPerfil/"+ id, formulario);

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

  // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  rank(ruta: any, calificacion: string, quien:any){
    return this.http.put<post_model[]>(this.URL_API+"/rank/"+ruta, {calificacion, quien})
  }

}
