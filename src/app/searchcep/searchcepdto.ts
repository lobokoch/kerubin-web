/**********************************************************************************************
Code generated with MKL Plug-in version: 55.0.0
Code generated at time stamp: 2020-01-24T00:38:21.774
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

// DTO do resultado da consulta em: https://viacep.com.br/
export class SearchCEPDTO {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
	
  // This element only exists if the cep could not be found.
  erro: boolean;
}

