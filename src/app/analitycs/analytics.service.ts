/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const ID = 'UA-157001792-1';

declare let gtag: Function;

const CAN_EXECUTE = environment.production;

@Injectable()
export class AnalyticsService {

  constructor() { }

  sendGTag(url: string) {
  	if (CAN_EXECUTE) {
  	  gtag('config', ID, {'page_path': url});
  	}
  }

  sendEvent(category: string, action: string, label: string, value: number = 0) {
  	if (CAN_EXECUTE) {
  	  gtag('event', action, {
  	    'event_category': category,
  	    'event_label': label,
  	    'value': value
  	  });
  	}
    
  }
}

/*
From: https://developers.google.com/analytics/devguides/collection/gtagjs/events
- <action> é a string que aparecerá como a ação do evento nos relatórios de eventos do Google Analytics.
- <category> é a string que aparecerá como a categoria do evento.
- <label> é a string que aparecerá como o rótulo do evento.
- <value> é um número inteiro não negativo que aparecerá como o valor do evento.

*/


