import { AppRoutingModule } from './app-rounting-module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SecurityModule } from './security/security.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    SecurityModule,
    AppRoutingModule
  ],

  providers: [

  ],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule {

}

