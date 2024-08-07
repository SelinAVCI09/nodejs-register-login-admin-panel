import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule ekleyin
import { ReactiveFormsModule } from '@angular/forms'; // ReactiveFormsModule ekleyin
import { FormsModule } from '@angular/forms'; // FormsModule ekleyin

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Page1Component } from './components/page1/page1.component';
import { Page2Component } from './components/page2/page2.component';
import { Page3Component } from './components/page3/page3.component';
import { Page4Component } from './components/page4/page4.component';
import { Page5Component } from './components/page5/page5.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    Page4Component,
    Page5Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // HttpClientModule ekleyin
    ReactiveFormsModule, // ReactiveFormsModule ekleyin
    FormsModule // FormsModule ekleyin
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }