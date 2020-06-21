import { ConciliacaoTransacao } from './../../financeiro/banco/conciliacaotransacao/conciliacaotransacao.model';
import { ConciliacaoTransacaoListComponent } from './../../financeiro/banco/conciliacaotransacao/list-conciliacaotransacao.component';
import { ConciliacaoTransacaoService } from './../../financeiro/banco/conciliacaotransacao/conciliacaotransacao.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConciliacaoReprocessamentoService {

  constructor( ) {

  }

  pollingRef: any;
  ids: string[] = new Array();

  conciliacaoTransacaoService: ConciliacaoTransacaoService;
  component: ConciliacaoTransacaoListComponent;

  setComponent(component: ConciliacaoTransacaoListComponent) {
    this.component = component;
  }

  setConciliacaoTransacaoService(conciliacaoTransacaoService: ConciliacaoTransacaoService) {
    this.conciliacaoTransacaoService = conciliacaoTransacaoService;
  }

  runPolling() {
    console.log('runPolling:%s', this.ids);
    const size = this.ids?.length ?? 0;
    if (size === 0) {
      this.stopTrack();
      return;
    }

    this.conciliacaoTransacaoService
    .findByIdIn(this.ids)
    .then(response => {
      this.updateTransacoes(response);
    })
    .catch(e => {
      console.log('Error at ConciliacaoReprocessamentoService.runPolling. Error: %s', e);
    });
  }

  updateTransacoes(transacoesAtualizadas: ConciliacaoTransacao[]) {
    console.log('updateTransacoes:%s', transacoesAtualizadas);
    // const gridItems = [...this.conciliacaoTransacaoListItems];
    let size = transacoesAtualizadas?.length ?? 0;
    if (size === 0) {
      this.ids = new Array(); // clear array
      this.stopTrack();
      return;
    }

    const items = this.component.conciliacaoTransacaoListItems;
    transacoesAtualizadas.forEach(itemAtualizado => {
      const itemEncontrado = items.find(itemAntigo => itemAntigo.id === itemAtualizado.id);
      if (itemEncontrado) {
        this.mergeItem(itemEncontrado, itemAtualizado);

        console.log('itemEncontrado.situacaoConciliacaoTrn:%s', String(itemEncontrado?.situacaoConciliacaoTrn));
        // Remove da lista de ids, os ids já reprocessado.
        if ('NAO_CONCILIADO' !== String(itemEncontrado?.situacaoConciliacaoTrn)) {
          itemEncontrado.reprocessando = false;
          const idIndex = this.ids.findIndex(it => it === itemEncontrado.id);
          if (idIndex !== -1) {
            this.ids.splice(idIndex, 1);
          }
        }
      }
    });

    // Remove eventuais ids em reprocessamentos, porém não retornados da consulta dos reprocessados.
    const idsClone = [...this.ids];
    idsClone.forEach(id => {
      let index = transacoesAtualizadas.findIndex(item => item.id === id);
      if (index === -1) { // Não encontrado.
        // remove da lista dos ids, sumiu.
        index = this.ids.findIndex(it => it === id);
        if (index !== -1) {
          this.ids.splice(index, 1);
        } else {
          console.log('this.ids.splice: Index sumiu:' + index);
        }
      }
    });

    size = this.ids?.length ?? 0;
    if (size === 0) {
      this.ids = new Array(); // clear array
      this.stopTrack();
      return;
    }

  }

  mergeItem(target: ConciliacaoTransacao, source: ConciliacaoTransacao) {
    Object.keys(target).forEach(key => {
      target[key] = source[key];
    });

    /*target.situacaoConciliacaoTrn = target.situacaoConciliacaoTrn;
    target.tituloConciliadoId = target.tituloConciliadoId;
    target.tituloConciliadoDesc = target.tituloConciliadoDesc;
    target.tituloConciliadoValor = target.tituloConciliadoValor;
    target.tituloConciliadoDataVen = target.tituloConciliadoDataVen;
    target.tituloConciliadoDataPag = target.tituloConciliadoDataPag;
    target.tituloPlanoContas = target.tituloPlanoContas;
    target.tituloConciliadoMultiple = target.tituloConciliadoMultiple;
    target.dataConciliacao = target.dataConciliacao;
    target.conciliacaoTransacaoTitulos: ConciliacaoTransacaoTitulo[];
    target.conciliadoComErro: boolean = false;
    target.conciliadoMsg: string;*/

  }

  track(newIds: string[]) {
    const size = newIds?.length ?? 0;
    if (size > 0) {
      this.stopTrack();
      newIds.forEach(id => this.ids.push(id));
      this.startTrack();
    }
  }

  startTrack() {
    this.pollingRef = setInterval(() => {
      this.runPolling();
    }, 3000);
  }


  stopTrack() {
    clearInterval(this.pollingRef);
    this.pollingRef = null;
    console.log('stopTrack');
  }




}
