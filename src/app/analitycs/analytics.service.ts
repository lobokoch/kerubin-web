/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.6
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const TAG_ID = 'UA-157001792-1';

declare let gtag: Function;

const CAN_EXECUTE = environment.production;

@Injectable()
export class AnalyticsService {

  constructor() { }

  sendGTag(url: string) {
  	if (CAN_EXECUTE && url) {
      // Replaces the real uuid with a token "uuid"
      // from: https://www.kerubin.com.br/contapagar/ba73db96-8766-4ab1-819c-28859f89add4
      // to:   https://www.kerubin.com.br/contapagar/uuid
      const index = url.lastIndexOf('/');
      let pagePath = url;
      if (index > -1) {
        const id = url.substring(index + 1);
        if (id && id.length > 32) { // length of ba73db96-8766-4ab1-819c-28859f89add4
          const parts = id.split('-');
          if (parts && parts.length === 5) {
            pagePath = url.substring(0, index) + '/uuid';
          }
        }
      }
  	  gtag('config', TAG_ID, {'page_path': pagePath});
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


