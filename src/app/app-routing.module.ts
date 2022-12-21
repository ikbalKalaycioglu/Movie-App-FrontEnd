import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllContentsComponent } from './Components/all-contents/all-contents.component';
import { ContentDetailComponent } from './Components/content-detail/content-detail.component';
import { ContentComponent } from './Components/content/content.component';
import { DirectorDetailComponent } from './Components/director-detail/director-detail.component';
import { DirectorComponent } from './Components/director/director.component';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { RegisterComponent } from './Components/register/register.component';
import { StarDetailComponent } from './Components/star-detail/star-detail.component';
import { StarComponent } from './Components/star/star.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: ContentComponent},
  { path: "allcontent", component: AllContentsComponent },
  { path: "stars", component: StarComponent },
  { path: "directors", component: DirectorComponent },
  { path: "content/:contentId", component: ContentDetailComponent },
  { path: "category/:categoryId", component: ContentComponent},
  { path: "directordetail/:directorId", component: DirectorDetailComponent},
  { path: "stardetail/:starId", component: StarDetailComponent},
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
