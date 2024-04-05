import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FontService {

  constructor() { }

  capitalize(input: string): string {
    let output = input[0].toUpperCase() + input.substr(1).toLowerCase()
    return output
  }
}