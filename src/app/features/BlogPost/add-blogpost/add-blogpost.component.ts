import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { BlogpostService } from '../services/blogpost.service';
//import { AddBlogPostRequest } from '../models/blogpost.model';
import { BlogpostService } from '../Services/blogpost.service';
import { AddBlogPostRequest, Category } from '../Models/blogpost.model';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
@Component({
  selector: 'app-add-blogpost',
  //imports:[MarkdownComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {

  addBlogPostForm: FormGroup;
  imageError=false;
  categories:Category[]=[];

  constructor(
    private fb: FormBuilder,
    private blogPostService: BlogpostService,
    private route:Router
  ) {

    this.addBlogPostForm = this.fb.group({

      title: ['', Validators.required],

      shortDescription: ['', Validators.required],

      content: ['', Validators.required],

      urlHandle: ['', Validators.required],

      featuredImageURL: ['', Validators.required],

      auther: ['', Validators.required],

      isvisible: [true],
      categotys:[[],Validators.required]

    });

  }
ngOnInit():void{
  this.loadCategories();
}
 loadCategories(): void {

    this.blogPostService.getallcategory()
      .subscribe({

        next: (response: Category[]) => {

          this.categories = response;

          console.log('Categories loaded:', this.categories);

        },

        error: (error) => {

          console.error('Error while loading categories');
          console.error(error);

        }

      });
  }
back():void{
this.route.navigate(['/admin/blogpost']);
}

  addBlogPost(): void {

    if (this.addBlogPostForm.invalid) {

      this.addBlogPostForm.markAllAsTouched();

      return;
    }


    const blogPost: AddBlogPostRequest =
      this.addBlogPostForm.value;


    this.blogPostService.addblogpost(blogPost)
      .subscribe({

        next: (response) => {

          console.log('Blog Post Created Successfully');
          alert('Blog Post Created Successfully');

          console.log(response);

          this.addBlogPostForm.reset({
            isvisible: true,
            categoryIds: []
          });

          this.route.navigate(['/admin/blogpost']);

        },

        error: (error) => {
            alert(' Error While Blog Post Creating ');

         // console.error('Error while creating blog post');
          console.log("STATUS:", error.status);
  console.log("ERROR BODY:", error.error);
  console.log("VALIDATION ERRORS:", error.error?.errors);
         // console.error(error);

        }

      });

  }

}