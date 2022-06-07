import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { FeedComponent } from './feed/feed.component';
import { RedirectorComponent } from './redirector/redirector.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{
  path:"chat-heleo",
  component: ChatComponent
},
{
  path:"registrarse",
  component: RegistroComponent
},
{
  path:"inicio-sesion",
  component: InicioSesionComponent
},
{
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
  path:"category/:name",
  component:FeedComponent
},
{
  path:"red/:name",
  component:RedirectorComponent
 
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
