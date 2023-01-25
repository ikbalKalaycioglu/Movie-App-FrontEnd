import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
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
import { ContentAddComponent } from './Components/admin/content-add/content-add.component';
import { CategoryAddComponent } from './Components/admin/category-add/category-add.component';
import { StarAddComponent } from './Components/admin/star-add/star-add.component';
import { DirectorAddComponent } from './Components/admin/director-add/director-add.component';
import { ContentUpdateComponent } from './Components/admin/content-update/content-update.component';
import { ContentDeleteComponent } from './Components/admin/content-delete/content-delete.component';
import { CategoryUpdateComponent } from './Components/admin/category-update/category-update.component';
import { CategoryDeleteComponent } from './Components/admin/category-delete/category-delete.component';
import { StarUpdateComponent } from './Components/admin/star-update/star-update.component';
import { StarDeleteComponent } from './Components/admin/star-delete/star-delete.component';
import { DirectorUpdateComponent } from './Components/admin/director-update/director-update.component';
import { DirectorDeleteComponent } from './Components/admin/director-delete/director-delete.component';
import { SafePipe } from './pipes/safe.pipe';
import { WathListComponent } from './Components/user/wath-list/wath-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Top100MoviesComponent } from './Components/top100-movies/top100-movies.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
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
    ContentAddComponent,
    CategoryAddComponent,
    StarAddComponent,
    DirectorAddComponent,
    ContentUpdateComponent,
    ContentDeleteComponent,
    CategoryUpdateComponent,
    CategoryDeleteComponent,
    StarUpdateComponent,
    StarDeleteComponent,
    DirectorUpdateComponent,
    DirectorDeleteComponent,
    SafePipe,
    WathListComponent,
    Top100MoviesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    SocialLoginModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      closeButton: false,
      progressAnimation: 'increasing',
      progressBar: true,
      disableTimeOut: false
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: 'SocialAuthServiceConfig', useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('266378806369-9tb21cto73n7303pnpuqboe842eh5fah.apps.googleusercontent.com')
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
