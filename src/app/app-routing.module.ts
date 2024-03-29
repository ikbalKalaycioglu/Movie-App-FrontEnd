import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAddComponent } from './Components/admin/category-add/category-add.component';
import { CategoryDeleteComponent } from './Components/admin/category-delete/category-delete.component';
import { CategoryUpdateComponent } from './Components/admin/category-update/category-update.component';
import { CommentsComponent } from './Components/admin/comments/comments.component';
import { ContentAddComponent } from './Components/admin/content-add/content-add.component';
import { ContentDeleteComponent } from './Components/admin/content-delete/content-delete.component';
import { ContentUpdateComponent } from './Components/admin/content-update/content-update.component';
import { DirectorAddComponent } from './Components/admin/director-add/director-add.component';
import { DirectorDeleteComponent } from './Components/admin/director-delete/director-delete.component';
import { DirectorUpdateComponent } from './Components/admin/director-update/director-update.component';
import { StarAddComponent } from './Components/admin/star-add/star-add.component';
import { StarDeleteComponent } from './Components/admin/star-delete/star-delete.component';
import { StarUpdateComponent } from './Components/admin/star-update/star-update.component';
import { AllContentsComponent } from './Components/all-contents/all-contents.component';
import { ContentDetailComponent } from './Components/content-detail/content-detail.component';
import { ContentComponent } from './Components/content/content.component';
import { DirectorDetailComponent } from './Components/director-detail/director-detail.component';
import { DirectorComponent } from './Components/director/director.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RecoverPasswordComponent } from './Components/recover-password/recover-password.component';
import { RegisterComponent } from './Components/register/register.component';
import { StarDetailComponent } from './Components/star-detail/star-detail.component';
import { StarComponent } from './Components/star/star.component';
import { Top100MoviesComponent } from './Components/top100-movies/top100-movies.component';
import { WathListComponent } from './Components/user/wath-list/wath-list.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", component: ContentComponent },
  { path: "allcontent", component: AllContentsComponent },
  { path: "stars", component: StarComponent },
  { path: "directors", component: DirectorComponent },
  { path: "top_100_movies", component: Top100MoviesComponent },
  { path: "content/:contentId", component: ContentDetailComponent },
  { path: "category/:categoryId", component: ContentComponent },
  { path: "directordetail/:directorId", component: DirectorDetailComponent },
  { path: "stardetail/:starId", component: StarDetailComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "recover-password/:email/:resetToken", component: RecoverPasswordComponent },
  { path: "watchList", component: WathListComponent, canActivate: [LoginGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [LoginGuard] },
  { path: "addcontent", component: ContentAddComponent, canActivate: [LoginGuard] },
  { path: "updatecontent", component: ContentUpdateComponent, canActivate: [LoginGuard] },
  { path: "deletecontent", component: ContentDeleteComponent, canActivate: [LoginGuard] },
  { path: "addcategory", component: CategoryAddComponent, canActivate: [LoginGuard] },
  { path: "updatecategory", component: CategoryUpdateComponent, canActivate: [LoginGuard] },
  { path: "deletecategory", component: CategoryDeleteComponent, canActivate: [LoginGuard] },
  { path: "addstar", component: StarAddComponent, canActivate: [LoginGuard] },
  { path: "updatestar", component: StarUpdateComponent, canActivate: [LoginGuard] },
  { path: "deletestar", component: StarDeleteComponent, canActivate: [LoginGuard] },
  { path: "adddirector", component: DirectorAddComponent, canActivate: [LoginGuard] },
  { path: "updatedirector", component: DirectorUpdateComponent, canActivate: [LoginGuard] },
  { path: "deletedirector", component: DirectorDeleteComponent, canActivate: [LoginGuard] },
  { path: "comments", component: CommentsComponent, canActivate: [LoginGuard] },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
