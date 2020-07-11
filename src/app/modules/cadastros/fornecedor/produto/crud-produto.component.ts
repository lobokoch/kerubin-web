import { FotoDTO } from './../foto/foto.model';
/**********************************************************************************************
Code generated by MKL Plug-in
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ElementRef, ViewChild } from '@angular/core';
import { Produto } from './produto.model';
import { ProdutoService } from './produto.service';
import { CadastrosFornecedorTranslationService } from './../i18n/cadastros-fornecedor-translation.service';

// import { FotoService } from './../foto/foto.service';
import { Foto } from './../foto/foto.model';
import { FotoAutoComplete } from './../foto/foto.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';


@Component({
  selector: 'app-crud-produto',
  templateUrl: './crud-produto.component.html',
  styleUrls: ['./crud-produto.component.css']
})

export class ProdutoComponent implements OnInit {
  /////////////////////////
  produtoFotosToUpload: File[];
  produtoFotosUploadProgressValue = 0;
  produtoFotosUploadProgressRatio = 0;
  produtoFotosUploadProgressShow = false;
  /////////////////////////
  produtoFotosUpload: any[] = [];

  fotos: FotoDTO[] = [];

  showHideHelp = false; // for show/hide help.

  produto = new Produto();
  produtoFotosAutoCompleteSuggestions: FotoAutoComplete[];

  @ViewChild('produto_nome_elementRef', { static: true }) produtoDefaultElementRef: ElementRef;
  draggedFoto: FotoDTO;

  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  constructor(
    private produtoService: ProdutoService,
    private cadastrosFornecedorTranslationService: CadastrosFornecedorTranslationService,
    // private fotoService: FotoService,
    private route: ActivatedRoute,
    private messageHandler: MessageHandlerService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getProdutoById(id);
    }
    this.produtoDefaultElementSetFocus();
  }

  getShowHideHelpLabel(): string {
    return this.showHideHelp ? 'Ocultar ajuda' : 'Mostrar ajuda';
  }

  beginFormProduto(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.produto = new Produto();
      this.produtoDefaultElementSetFocus();
    }.bind(this), 1);
  }

  validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);

      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  saveFormProduto(form: FormGroup) {
    if (!form.valid) {
      this.validateAllFormFields(form);
      return;
    }
    if (this.isEditing) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {

    this.produtoService.create(this.produto)
      .then((produto) => {
        this.produto = produto;
        this.messageHandler.showSuccess('Registro criado com sucesso!');
        this.produtoDefaultElementSetFocus();
      }).
      catch(error => {
        this.messageHandler.showError(error);
      });
  }

  update() {
    this.produtoService.update(this.produto)
      .then((produto) => {
        this.produto = produto;
        this.messageHandler.showSuccess('Registro alterado!');
        this.produtoDefaultElementSetFocus();
      })
      .catch(error => {
        this.messageHandler.showError(error);
      });
  }

  getProdutoById(id: string) {
    this.produtoService.retrieve(id)
      .then((produto) => {
        this.produto = produto;
      })
      .catch(error => {
        this.messageHandler.showError(error);
      });
  }

  get isEditing() {
    return Boolean(this.produto.id);
  }



  produtoFotosAutoCompleteClear(event) {
    // The autoComplete value has been reseted
    this.produto.fotos = null;
  }

  produtoFotosAutoCompleteOnBlur(event) {
    // Seems a PrimeNG bug, if clear an autocomplete field, on onBlur event, the null value is empty string.
    // Until PrimeNG version: 7.1.3.
    if (String(this.produto.fotos) === '') {
      this.produto.fotos = null;
    }
  }

  produtoFotosAutoComplete(event) {
    const query = event.query;
    this.produtoService
      .fotoFotosAutoComplete(query)
      .then((result) => {
        this.produtoFotosAutoCompleteSuggestions = result as FotoAutoComplete[];
      })
      .catch(error => {
        this.messageHandler.showError(error);
      });
  }

  produtoFotosAutoCompleteFieldConverter(fotos: FotoAutoComplete) {
    let text = '';
    if (fotos) {
      if (fotos.nome) {
        if (text !== '') {
          text += ' - ';
        }
        text += fotos.nome;
      }

    }

    if (text === '') {
      text = null;
    }
    return text;
  }


  // TODO: temporário, só para testes.
  getTranslation(key: string): string {
    const value = this.cadastrosFornecedorTranslationService.getTranslation(key);
    return value;

    // const result = key.substring(key.lastIndexOf('_') + 1);
    // return result;
  }

  produtoDefaultElementSetFocus() {
    try {
      this.produtoDefaultElementRef.nativeElement.focus();
    } catch (error) {
      console.log('Error setting focus at produtoDefaultElementSetFocus:' + error);
    }
  }

  ////////////////////////////////////
  get getUrlProdutoFotosUpload() {
    return this.produtoService.getUrlProdutoFotosUpload(this.produto.id);
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  onUploadError(event) {
    // this.conciliacaoId = null;
    console.log('Erro no upload:' + event);
  }

  deleteProdutoFotosItem(foto: FotoDTO) {
    console.log('deleteProdutoFotosItem:' + foto);

    if (foto && foto.id) {
      this.produtoService.deleteProdutoFotosItem(foto.id)
      .then(() => {
        const index = this.fotos.findIndex(it => it.id === foto.id);
        if (index !== -1) {
          this.fotos.splice(index, 1);
        } else {
          this.messageHandler.showError(`Foto id: ${foto.id} não encontrada na lista para exclusão.`);
        }
      })
      .catch(error => {
        console.log(error);
        this.messageHandler.showError(`Erro ao excluir foto id: ${foto.id}.`);
      });
    }
  }

  handleProdutoFotosUpload(event) {
    this.produtoFotosToUpload = event.files;
    this.produtoFotosUploadProgressValue = 0;
    this.produtoFotosUploadProgressRatio = 100 / this.produtoFotosToUpload.length;
    this.uploadProdutoFotos();
  }

  uploadProdutoFotos() {
    if (this.produtoFotosToUpload && this.produtoFotosToUpload.length > 0) {
      this.produtoFotosUploadProgressShow = true;
      this.uploadProdutoFoto(this.produtoFotosToUpload.splice(0, 1)[0]);
    } else {
      this.produtoFotosUploadProgressShow = false;
      this.produtoFotosUploadProgressValue = 0;
      this.produtoFotosUploadProgressRatio = 0;
    }
  }

  uploadProdutoFoto(foto: File) {
    this.produtoService.uploadProdutoFotoAndGet(this.produto.id, foto)
    .then((fotoDTO) => {
      const mimeType = fotoDTO.tipo;
      fotoDTO.imagem = `data:${mimeType};base64,${fotoDTO.imagem}`;
      fotoDTO.miniatura = `data:${mimeType};base64,${fotoDTO.miniatura}`;
      this.fotos.push(fotoDTO);

      if (this.produtoFotosToUpload.length > 0) {
        this.produtoFotosUploadProgressValue += Math.round(this.produtoFotosUploadProgressRatio);
      } else {
        this.produtoFotosUploadProgressValue = 100;
      }
      this.uploadProdutoFotos();

    })
    .catch(error => {
      this.messageHandler.showError(error);
    });
  }

  onUploadCompleted(event) {
    if (event && event.originalEvent && event.originalEvent.body && event.originalEvent.body) {
      // this.conciliacaoId = event.originalEvent.body.conciliacaoId;
      console.log(event.originalEvent.body);
      const fotoIdList: string[] = event.originalEvent.body;

      if (fotoIdList && fotoIdList.length > 0) {
        fotoIdList.forEach(fotoId => {
          this.produtoService.getProdutoFoto(fotoId)
            .then((fotoDTO) => {
              const mimeType = fotoDTO.tipo;
              fotoDTO.imagem = `data:${mimeType};base64,${fotoDTO.imagem}`;
              fotoDTO.miniatura = `data:${mimeType};base64,${fotoDTO.miniatura}`;
              this.fotos.push(fotoDTO);
            })
            .catch(error => {
              this.messageHandler.showError(error);
            });
        });

      }
    }
  }

  drop(event) {
    console.log('this.draggedFoto:' + this.draggedFoto);
    /*if (this.draggedFoto) {
      let draggedFotoIndex = this.findFotoIndex(this.draggedFoto);
      this.selectedFotos = [...this.selectedFotos, this.draggedCar];
      this.availableCars = this.availableCars.filter((val, i) => i != draggedCarIndex);
      this.draggedCar = null;
    }*/
  }

  dragStart(event, foto: FotoDTO) {
    this.draggedFoto = foto;
  }

  dragEnd(event) {
    this.draggedFoto = null;
  }

  findProdutoFotoIndex(id: string): number {
    return this.fotos.findIndex(foto => foto.id === id);
}
  ////////////////////////////////////

}
