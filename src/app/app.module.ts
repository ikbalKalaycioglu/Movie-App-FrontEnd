import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './Components/footer/footer.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { ContentComponent } from './Components/content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RegisterComponent } from './Components/register/register.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { ContentDetailComponent } from './Components/content-detail/content-detail.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { AllContentsComponent } from './Components/all-contents/all-contents.component';
import { StarComponent } from './Components/star/star.component';
import { DirectorComponent } from './Components/director/director.component';
import { DirectorDetailComponent } from './Components/director-detail/director-detail.component';
import { StarDetailComponent } from './Components/star-detail/star-detail.component';

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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
