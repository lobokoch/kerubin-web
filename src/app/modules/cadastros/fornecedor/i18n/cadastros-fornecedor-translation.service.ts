/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:39:21.435
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Injectable } from '@angular/core';
import * as localTranslations from 'src/app/modules/cadastros/fornecedor/i18n/pt-br.json';

@Injectable()
export class CadastrosFornecedorTranslationService {

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
