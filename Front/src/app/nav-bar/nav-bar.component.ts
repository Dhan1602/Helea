import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionesService } from '../Services/publicaciones-service.service';

@Component({
  selector: 'navBar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
@Injectable({
  providedIn: "root"
})
export class NavBarComponent implements OnInit {
  isLoger: boolean = false;
  public img = "https://i.imgur.com/KC1KPDW.png"

  constructor(private _router: Router, private servidor: PublicacionesService) { }

  ngOnInit(): void {
    let ip = this.servidor.getIPreferences(false);
    this.servidor.verifyLogeo(ip).subscribe({
      next: (r: any) => {
        if (r.estado) {
          this.isLoger = true;
        }
      },
      error: (e: any) => {
        console.log(e);
      }
    }) 
  }

  createRedirect() {
    this._router.navigate(["create"]);
  }
}


