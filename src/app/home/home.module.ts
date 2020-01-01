import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AccordionModule} from 'primeng/accordion';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AccordionModule,
    PanelModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
