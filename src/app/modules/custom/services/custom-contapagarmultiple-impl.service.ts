import { CustomContaPagarMultipleService } from './../../financeiro/contaspagar/contapagarmultiple/custom-contapagarmultiple.service';
import { ConfirmationService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomContaPagarMultipleServiceImpl extends CustomContaPagarMultipleService {

  constructor(
    private confirmation: ConfirmationService
  ) {
    super();
  }

}
