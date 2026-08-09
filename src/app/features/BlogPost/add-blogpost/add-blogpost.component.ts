import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { BlogpostService } from '../services/blogpost.service';
//import { AddBlogPostRequest } from '../models/blogpost.model';
import { BlogpostService } from '../Services/blogpost.service';
import { AddBlogPostRequest } from '../Models/blogpost.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {

  addBlogPostForm: FormGroup;

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

      isvisible: [true]

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

          console.log(response);

          this.addBlogPostForm.reset({
            isvisible: true
          });

        },

        error: (error) => {

          console.error('Error while creating blog post');

          console.error(error);

        }

      });

  }

}