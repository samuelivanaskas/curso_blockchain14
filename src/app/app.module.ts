import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './dashboard/home/home.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { NavMenuComponent } from './dashboard/nav-menu/nav-menu.component';
import { HttpClientModule } from '@angular/common/http';

// **************************************************
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './login/user/user.component';
import { RegisterComponent } from './login/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { WalletService } from './services/wallet.service';
import { ImportComponent } from './login/import/import.component';

registerLocaleData(ptBr);
// **************************************************

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    NavMenuComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    ImportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
     // ************************************
     { provide: LOCALE_ID, useValue: 'pt' },
     // ************************************
     WalletService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
