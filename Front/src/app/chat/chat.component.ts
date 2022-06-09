import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    messageToSend: any = null;

  constructor() { }
  
  ngOnInit(): void {
    let aja:any = document.querySelector("body");
    let script = document.createElement("script");
    script.type = 'text/javascript';
    script.innerHTML = `
      let abrioLista = false;
        document.querySelectorAll(".containerChekBox-absulute").forEach(ele => {
          ele.addEventListener("click",e=>{
              if(!abrioLista){
                  abrioLista = true;
                  document.querySelectorAll(".componets1").forEach(con => {
                      con.style.display = "block";
                      con.addEventListener("click",j=>{
                          document.querySelectorAll(".inputFilter")[0].value = "Canal: " + con.innerHTML;
                      });
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
  }

  sendMessage(){
      console.log(this.messageToSend);
      this.messageToSend = null;
  }
}
