import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { FeedComponent } from './feed/feed.component';
import { CreateComponent } from './create/create.component';
=======
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
>>>>>>> 9723205d826f062d946c7b31fa02b73c79d2862f

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    FeedComponent,
    CreateComponent
=======
    NavBarComponent,
    HomeComponent
>>>>>>> 9723205d826f062d946c7b31fa02b73c79d2862f
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
