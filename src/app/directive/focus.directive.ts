/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.2
Code generated at time stamp: 2019-06-05T06:41:33.812
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { NgZone, Directive, AfterContentInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'input[appFocus]'
})
export class FocusDirective implements AfterContentInit {

  constructor(
    private el: ElementRef<HTMLInputElement>
    /*, private zone: NgZone,
    private renderer: Renderer2*/) {}

  ngAfterContentInit(): void {
    this.el.nativeElement.focus();
  }

}
