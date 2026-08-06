import { Component,effect, inject } from '@angular/core'
import { FormGroup,FormControl,ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Addcategoryrequest } from '../Models/category.model';
import { CategoryServiceService } from '../Services/category-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  constructor(){
    effect(()=>{
    if(this.categoryservice.addcategorystatus()==='success'){
      console.log("Add Category Success")
    } 
    if(this.categoryservice.addcategorystatus()==='error'){
      console.error("Add Category request Fail")
    }
  });
  }

  private categoryservice = inject(CategoryServiceService);



addCategoryFormgroup = new FormGroup({

  name:new FormControl<string>('' , {nonNullable: true,
    validators:[Validators.required,Validators.maxLength(100)],
  }),
  urlHandle: new FormControl<string>('',{nonNullable:true,
      validators:[Validators.required,Validators.maxLength(200)],
  })

});

get nameFormControl(){
  return this.addCategoryFormgroup.controls.name;
}


get urlHandleFormControl(){
  return this.addCategoryFormgroup.controls.urlHandle;
}


onsubmit(){
  console.log(this.addCategoryFormgroup.getRawValue());

  const addcategoryvalue=this.addCategoryFormgroup.getRawValue()

  const addcategoryrequestdto:Addcategoryrequest={
    name:addcategoryvalue.name,
    urlHandle:addcategoryvalue.urlHandle
  };


  this.categoryservice.addCategory(addcategoryrequestdto);

  
}
}
