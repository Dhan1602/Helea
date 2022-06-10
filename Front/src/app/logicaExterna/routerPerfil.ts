import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class perfilRutas{
    constructor(private _router:Router){}

    rect(param: any){
        this._router.navigate(["/feed"]);
        setTimeout(()=>{this._router.navigate(["/perfil/"+param]);}, 200 )
    }
}