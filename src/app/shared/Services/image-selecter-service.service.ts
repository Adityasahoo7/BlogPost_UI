import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageSelecterServiceService {

  constructor() { }

  showimageselector =signal<boolean>(false)

displayimageselector(){
  this.showimageselector.set(true);
}

hideimageselector(){
  this.showimageselector.set(false);
}

}
