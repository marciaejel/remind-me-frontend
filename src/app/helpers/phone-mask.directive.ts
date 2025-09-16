import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true   // ✅ agora pode ser importada em componentes standalone
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput() {
    let input = this.el.nativeElement.value.replace(/\D/g, '');
    if (input.length > 11) input = input.slice(0, 11);

    if (input.length > 2 && input.length <= 6) {
      input = `(${input.slice(0, 2)}) ${input.slice(2)}`;
    } else if (input.length > 6 && input.length <= 10) {
      input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7)}`;
    } else if (input.length === 11) {
      input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7, 11)}`;
    }

    this.el.nativeElement.value = input;
  }
}
