import { Component, Injector } from '@angular/core';
import { PublicacionesService } from './Services/publicaciones-service.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  constructor(private servidor: PublicacionesService, private nav: NavBarComponent) { }

  ngOnInit(): void {
    let ip = this.servidor.getIPreferences(false);
    this.servidor.exitsIPreferences(ip).subscribe({
      next: (r2: any) => {
        if (!r2) {
          ip = this.servidor.getIPreferences(true);
          let fun = (respuesta: any) => {
            if (respuesta) {
              ip = this.servidor.getIPreferences(true);
              this.saveIP(ip, fun);
            }
          }
          this.saveIP(ip, fun);
        }
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }
  saveIP(ip: any, fun: any) {
    this.servidor.saveIPreferences(ip).subscribe({
      next: (r2: any) => {
        fun(r2);
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }
}
