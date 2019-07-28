import { CEPSearchDTO } from './cepsearchdto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CepSearchService {

  URL_PREFIX = 'https://viacep.com.br/ws/';
  URL_SUFIX = '/json/';

  constructor(
    private http: HttpClient
    ) {

    }

    searchCEP(cep: string): Promise<CEPSearchDTO> {
      // const headers = this.getHeaders();
      const valid = cep && cep.trim().length === 8;
      if (!valid) {
        const dto = new CEPSearchDTO();
        return Promise.resolve(dto);
      }

      return this.http.get<CEPSearchDTO>(`${this.URL_PREFIX}${cep}${this.URL_SUFIX}`)
      .toPromise()
      .then(response => {
        const result = response as CEPSearchDTO;
        return result;
      });
  }
}
