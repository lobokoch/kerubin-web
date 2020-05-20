/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.2
Code generated at time stamp: 2019-06-05T06:41:33.812
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { MenuModule } from 'primeng/menu';
import { KerubinMenuComponent } from './kerubin-menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { NgModule } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({

  imports: [
    PanelMenuModule,
    MenuModule,
    SidebarModule
  ],

  declarations: [
    KerubinMenuComponent
  ],

  exports: [
    KerubinMenuComponent,
    PanelMenuModule,
    MenuModule,
    SidebarModule
  ]

})

export class KerubinMenuModule {  }

