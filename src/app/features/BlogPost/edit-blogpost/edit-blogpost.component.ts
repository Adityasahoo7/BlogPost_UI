import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogpostService } from '../Services/blogpost.service';
import {
  AddBlogPostRequest,
  BlogPost,
  Category
} from '../Models/blogpost.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit {

  editBlogPostForm: FormGroup;

  categories: Category[] = [];

  blogPostId: string = '';

  isLoading: boolean = false;

  imageError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private blogPostService: BlogpostService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.editBlogPostForm = this.fb.group({

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


  ngOnInit(): void {

    this.blogPostId =
      this.route.snapshot.paramMap.get('id') || '';

    if (!this.blogPostId) {

      console.error('Blog Post ID not found');

      this.router.navigate(['/admin/blogpost']);

      return;

    }

    this.loadCategories();

    this.loadBlogPost();

  }


  // Load all categories
  loadCategories(): void {

    this.blogPostService.getallcategory()
      .subscribe({

        next: (response: Category[]) => {

          this.categories = response;

          console.log('Categories:', this.categories);

        },

        error: (error) => {

          console.error(
            'Error while loading categories:',
            error
          );

        }

      });

  }


  // Load existing blog post
  loadBlogPost(): void {

    this.isLoading = true;

    this.blogPostService
      .getbyidblog(this.blogPostId)
      .subscribe({

        next: (response: BlogPost) => {

          console.log('Blog Post:', response);


          // Get existing category IDs
          const categoryIds =
            response.categories?.map(
              category => category.id
            ) || [];


          // Populate form
          this.editBlogPostForm.patchValue({

            title: response.title,

            shortDescription:
              response.shortDescription,

            content: response.content,

            urlHandle: response.urlHandle,

            featuredImageURL:
              response.featuredImageURL,

            auther: response.auther,

            isvisible: response.isvisible,

            categoryIds: categoryIds

          });


          this.isLoading = false;

        },

        error: (error) => {

          console.error(
            'Error while loading blog post:',
            error
          );

          this.isLoading = false;

        }

      });

  }


  // Update Blog Post
  updateBlogPost(): void {

    if (this.editBlogPostForm.invalid) {

      this.editBlogPostForm.markAllAsTouched();

      return;

    }


    const blogPost: AddBlogPostRequest =
      this.editBlogPostForm.value;


    console.log(
      'Update Blog Post Request:',
      blogPost
    );


    this.isLoading = true;


    this.blogPostService
      .updateblog(
        this.blogPostId,
        blogPost
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Blog Post Updated Successfully'
          );

          console.log(response);

          this.isLoading = false;

          this.router.navigate([
            '/admin/blogpost'
          ]);

        },

        error: (error) => {

          console.error(
            'Error while updating blog post:',
            error
          );

          this.isLoading = false;

        }

      });

  }


  // Back to Blog List
  back(): void {

    this.router.navigate([
      '/admin/blogpost'
    ]);

  }

}