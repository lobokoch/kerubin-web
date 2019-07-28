
// DTO do resultado da consulta em: https://viacep.com.br/
export class CEPSearchDTO {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;

  erro: boolean;
}
