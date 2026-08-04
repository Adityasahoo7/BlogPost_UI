import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

addCategoryFormgroup = new FormGroup({

  name:new FormControl<string>('' , {nonNullable: true}),
  urlHandle: new FormControl<string>('',{nonNullable:true})

});
onsubmit(){
  console.log(this.addCategoryFormgroup.getRawValue());
}
}
