/**********************************************************************************************
Code generated with MKL Plug-in version: 3.9.0
Code generated at time stamp: 2019-06-12T22:12:49.976
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Injectable } from '@angular/core';
import * as localTranslations from 'src/app/modules/cadastros/cliente/i18n/pt-br.json';

@Injectable()
export class CadastrosClienteTranslationService {

  constructor() { }

  public getTranslation(key: string): string {
      if (localTranslations) {
        const translation = (<any>localTranslations).default[key];
        if (translation !== null) {
          return translation;
        }
      }
      return key;
  }

}