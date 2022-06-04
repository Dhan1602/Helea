import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { FeedComponent } from './feed/feed.component';
import { ContenidoComponent } from './contenido/contenido.component';


const routes: Routes = [{
  path:"feed",
  component: FeedComponent
},
{
  path:"create",
  component: CreateComponent
},
{
  path:"",
  component:HomeComponent
},
{
  path:"contenido",
  component:ContenidoComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
