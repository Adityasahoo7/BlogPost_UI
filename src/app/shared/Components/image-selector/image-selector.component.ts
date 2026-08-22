import { Component } from '@angular/core';
import { ImageSelecterServiceService } from '../../Services/image-selecter-service.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {

  constructor( private imageselectorservice:ImageSelecterServiceService ) {
   

  }
//imageselectorservice =inject(ImageSelecterServiceService);
 showimageselector =this.imageselectorservice.showimageselector.asReadonly();

hideimageselector(){
  this.imageselectorservice.hideimageselector();
}
}
