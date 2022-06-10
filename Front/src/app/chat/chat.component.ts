import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { chats } from '../Models/chats';
import { perfiles } from '../Models/perfiles';
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    perfil: perfiles = {
      userName: "",
      email: "",
      contrasena: ""
    }
    chat: chats = {
      idHeleo: "",
      categorysChats: [{
          category: "",
          messages: [{
              userName: "",
              message: "",
              fecha: {
                  fullDate: "",
                  hora: ""
              }
          }]
      }]
    }
    userActual: perfiles = {
      userName: "",
      email: "",
      contrasena: ""
    }
    status: any = 0;
    categorias: any = [];
    categorySelect: String = "";
    messagesCargar:any = [];
    messageToSend: any = "";
    heleo = this.route.snapshot.params["heleo"];

    stringCategory: any = "";
    viewPregunta: boolean = false;

  constructor(private route: ActivatedRoute, private servidor: PublicacionesService) { }
  
  ngOnInit(): void {
    this.cargarHeleo(false);
    let ip = this.servidor.getIPreferences(false);
    this.servidor.verifyLogeo(ip).subscribe({
      next: (r:any)=>{
        this.servidor.getProfileById(r.userID).subscribe({
          next: (r2:any)=>{
            this.userActual = r2;
          },
          error: (e2:any)=>{
            console.log(e2);
          }
        });
      },
      error: (e:any)=>{
        console.log(e);
      }
    });
    let aja:any = document.querySelector("body");
    let script = document.createElement("script");
    script.type = 'text/javascript';
    script.innerHTML = `
      abrioLista = false;
        document.querySelectorAll(".containerChekBox-absulute").forEach(ele => {
          ele.addEventListener("click",e=>{
              if(!abrioLista){
                  abrioLista = true;
                  document.querySelectorAll(".componets1").forEach(con => {
                      con.style.display = "block";
                  });
              }else{
                  abrioLista = false;
                  document.querySelectorAll(".componets1").forEach(con => {
                      con.style.display = "none";
                  });
              }
          });
      });
    `;
    aja.appendChild(script);
    setTimeout(()=> this.newMesaasges(),1000);
  }
  cargarHeleo(cat:any){
    this.servidor.cargarChat(this.heleo).subscribe({
      next: (r:any)=>{
        this.chat = r.chat;
        this.perfil = r.perfil;
        if(cat){
          this.categorySelect = cat;
          operacion: {
            for(let m of this.chat.categorysChats){
              if(m.category == this.categorySelect){
                this.messagesCargar = m.messages;
                break operacion;
              }
            }
          }
        }else{
          this.messagesCargar = r.chat.categorysChats[0].messages;
          this.categorySelect = r.chat.categorysChats[0].category;
        }
      },
      error: (e:any)=>{
        console.log(e);
      }
    });
  }

  sendMessage(){
    let fecha = new Date();
    let send = {
      category: this.categorySelect,
      message: {
        userName: this.userActual.userName,
        message: this.messageToSend,
        fecha: {
            fullDate: fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear(),
            hora: fecha.getHours()+":"+fecha.getMinutes()
        }
      }
    }
    this.servidor.saveMessage(this.chat._id, send).subscribe({
      next: (r:any)=>{
        this.cargarHeleo(this.categorySelect);
      },
      error: (e:any)=>{
        console.log(e);
      }
    });
    this.messageToSend = "";
  }
  newMesaasges(){
    setInterval(()=> {
      this.servidor.verCambios().subscribe({
        next: (r:any)=>{
          if(this.status < r.status){
            this.cargarHeleo(this.categorySelect);
            this.status = r.status;
          }
        },
        error: (e:any)=>{
          console.log(e);
        }
      });
    }, 1500);
  }

  newCategory(){
    this.viewPregunta = true;
  }
  closePregunta(){
    this.viewPregunta = false;
  }
  sendCategory(){
    if(this.stringCategory.trim() != ""){
      let cuerpo = {
        category: this.stringCategory,
        messages: []
      }
      this.servidor.newCategory(this.chat._id, cuerpo).subscribe({
        next: (r:any)=>{
          this.viewPregunta = false;
          this.cargarHeleo(false);
        },
        error: (e:any)=>{
          console.log(e);
        }
      });
    }
    this.stringCategory = "";
  }

  cargarMensajeCategoria(cat:any){
    this.categorySelect = cat.innerHTML.trim()+"";
    operacion: {
      for(let m of this.chat.categorysChats){
        if(m.category == this.categorySelect){
          this.messagesCargar = m.messages;
          break operacion;
        }
      }
    }
  }
}