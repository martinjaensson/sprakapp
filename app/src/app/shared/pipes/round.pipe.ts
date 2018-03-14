import {PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'round'
    // pure: false
})

export class RoundPipe {
  transform (input:number) {
    return Math.floor(input);
  }
}
