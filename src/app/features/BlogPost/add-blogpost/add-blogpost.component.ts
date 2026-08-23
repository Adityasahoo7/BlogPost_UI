import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BlogpostService } from '../Services/blogpost.service';
import { AddBlogPostRequest, Category } from '../Models/blogpost.model';
import { ImageSelecterServiceService } from 'src/app/shared/Services/image-selecter-service.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {

  addBlogPostForm: FormGroup;

  imageError = false;

  categories: Category[] = [];

  private selectedImageSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private blogPostService: BlogpostService,
    private route: Router,
    private imageselecterservice: ImageSelecterServiceService
  ) {

    this.addBlogPostForm = this.fb.group({

      title: ['', Validators.required],

      shortDescription: ['', Validators.required],

      content: ['', Validators.required],

      urlHandle: ['', Validators.required],

      featuredImageURL: ['', Validators.required],

      auther: ['', Validators.required],

      isvisible: [true],

      categotys: [[], Validators.required]

    });

  }


  openimageselector(): void {
    this.imageselecterservice.displayimageselector();
  }


  ngOnInit(): void {

    // Listen for image selections from the image selector
    this.selectedImageSubscription =
      this.imageselecterservice.selectedImage$
        .subscribe(image => {

          this.addBlogPostForm.patchValue({
            featuredImageURL: image.url
          });

          this.imageError = false;

        });

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


  back(): void {
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
            categotys: []
          });

          this.imageError = false;

          this.route.navigate(['/admin/blogpost']);

        },

        error: (error) => {

          alert('Error while creating blog post');

          console.log('STATUS:', error.status);
          console.log('ERROR BODY:', error.error);
          console.log('VALIDATION ERRORS:', error.error?.errors);

        }

      });

  }


  ngOnDestroy(): void {

    this.selectedImageSubscription?.unsubscribe();

  }

}