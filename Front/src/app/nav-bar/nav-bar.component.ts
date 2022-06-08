import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navBar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  createRedirect() {
    this._router.navigate(["create"]);
  }
}


