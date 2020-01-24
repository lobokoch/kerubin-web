/**********************************************************************************************
Code generated with MKL Plug-in version: 55.0.0
Code generated at time stamp: 2020-01-24T00:38:21.774
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { SearchCEPDTO } from './searchcepdto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchCEPService {

  URL_PREFIX = 'https://viacep.com.br/ws/';
  URL_SUFIX = '/json/';

  constructor(
    private http: HttpClient
    ) {

    }

    searchCEP(cep: string): Promise<SearchCEPDTO> {
      const valid = cep && cep.trim().length === 8;
      if (!valid) {
        return Promise.resolve(this.newSearchCEPDTO(cep));
      }

      return this.http.get<SearchCEPDTO>(`${this.URL_PREFIX}${cep}${this.URL_SUFIX}`)
      .toPromise()
      .then(response => {
        if (!response.hasOwnProperty('erro')) {
          const result = response as SearchCEPDTO;
          return result;
        } else {
          console.log('CEP not found: ' + cep);
        return Promise.resolve(this.newSearchCEPDTO(cep));
        }
      })
      .catch(error => {
        console.log('Error in searchCEP: ' + error);
        return Promise.resolve(this.newSearchCEPDTO(cep));
      });
    }

    private newSearchCEPDTO(cep: string): SearchCEPDTO {
      const dto = new SearchCEPDTO();
      dto.cep = cep;
      dto.erro = true;
      return dto;
    }
}

