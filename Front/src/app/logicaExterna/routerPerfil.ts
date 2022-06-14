import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class perfilRutas{
    constructor(private _router:Router){}

    rect(param: any){
        this._router.navigate(["/perfil/"+param]);
    }
    chat(param: any){
        this._router.navigate(["/chat/"+param]);
    }
}