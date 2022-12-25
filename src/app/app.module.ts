import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './Components/footer/footer.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { ContentComponent } from './Components/content/content.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RegisterComponent } from './Components/register/register.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { ContentDetailComponent } from './Components/content-detail/content-detail.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllContentsComponent } from './Components/all-contents/all-contents.component';
import { StarComponent } from './Components/star/star.component';
import { DirectorComponent } from './Components/director/director.component';
import { DirectorDetailComponent } from './Components/director-detail/director-detail.component';
import { StarDetailComponent } from './Components/star-detail/star-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProfileComponent } from './Components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SideBarComponent,
    ContentComponent,
    NavbarComponent,
    RegisterComponent,
    PageNotFoundComponent,
    LoginComponent,
    ContentDetailComponent,
    SearchFilterPipe,
    AllContentsComponent,
    StarComponent,
    DirectorComponent,
    DirectorDetailComponent,
    StarDetailComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: false,
      progressAnimation: 'increasing',
      progressBar: true,
      disableTimeOut: false
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
