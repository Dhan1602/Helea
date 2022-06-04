import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirector',
  templateUrl: './redirector.component.html',
  styleUrls: ['./redirector.component.css']
})
export class RedirectorComponent implements OnInit {

  nameParam = this.route.snapshot.params["name"];

  constructor(private _router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this._router.navigate(["/category/"+this.nameParam]);
  }

}
