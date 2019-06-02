import { FornecedorModule } from './fornecedor/fornecedor.module';
import { CadastrosFornecedorTranslationService } from './i18n/cadastros-fornecedor-translation.service';
import { NgModule } from '@angular/core';

@NgModule({

  imports: [
   FornecedorModule
  ],

  declarations: [
  ],

  exports: [
    FornecedorModule
  ],

  providers: [

  ]

})

export class CadastrosFornecedorModule { }
