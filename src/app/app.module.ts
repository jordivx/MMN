import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';
import { CodeComponent } from './code/code.component';
import { CodeService } from './code.service';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    CodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CodeService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
