import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { ManagementComponent } from './pages/management/management.component';
import { AddDepartureComponent } from './components/add-departure/add-departure.component';

const routes: Routes = [
  {path:"",component:MainComponent}, //la prima pagina che viene visualizzata attraverso il <route-outlet>

  {path:"home",component:MainComponent},
  {path:"login",component:LoginComponent},
  {path:"managment",canActivate:[authGuard],component:ManagementComponent},
  {path:"departure",component:AddDepartureComponent},



  {path:"**",component:NotFoundComponent}  //se metto un /namepage che non esiste, vengo indirizzato in una pagina di errore];
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
