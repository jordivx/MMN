import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appLimitedCharacters]',
  host: {
    '(keypress)': '_onKeypress($event)',
  }
})
export class LimitedCharactersDirective {

  constructor() { }

  @Input('appLimitedCharacters') limitTo;
  _onKeypress(e) {
     const limit = +this.limitTo;
     if (e.target.value.length === limit) { e.preventDefault(); }
  }

}
