import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BlogpostService } from '../Services/blogpost.service';
import { BlogPost } from '../Models/blogpost.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent {

  blogPosts: BlogPost[] = [];

  isLoading: boolean = false;

  errorMessage: string = '';

  constructor(
    private router: Router,
    private blogservice: BlogpostService
  ) {}

  ngOnInit(): void {

    this.getallblogpost();

  }


  // Get all blog posts
  getallblogpost(): void {

    this.isLoading = true;

    this.errorMessage = '';

    this.blogservice.getAllblogpost().subscribe({

      next: (response: BlogPost[]) => {

        this.blogPosts = response;

        console.log('Blog Posts:', this.blogPosts);

        this.isLoading = false;

      },

      error: (error) => {

        console.error('Error while loading blog posts:', error);

        this.errorMessage =
          'Unable to load blog posts. Please try again.';

        this.isLoading = false;

      }

    });

  }


  // Navigate to Add Blog Post
  navigatetoaddpost(): void {

    this.router.navigate(['/admin/blogpost/add']);

  }


  // Navigate to Edit Blog Post
  editBlogPost(id: string): void {

    this.router.navigate([
      'admin/blogpost/editblog',
      id
    ]);

  }


  // Delete Blog Post
  deleteBlogPost(id: string): void {

    const confirmDelete = confirm(
      'Are you sure you want to delete this blog post?'
    );

    if (!confirmDelete) {

      return;

    }


    this.isLoading = true;

    this.errorMessage = '';


    this.blogservice.deleteblog(id).subscribe({

      next: (response) => {

        console.log('Blog post deleted successfully');
          alert('Blog Post Deleted Successfully');

        // Refresh the list
        this.getallblogpost();

      },

      error: (error) => {

        console.error(
          'Error while deleting blog post:',
          error
        );

        this.errorMessage =
          'Unable to delete blog post. Please try again.';

        this.isLoading = false;
          alert('Error while creating the blogpost');

      }

    });

  }

}