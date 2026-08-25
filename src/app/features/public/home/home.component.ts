import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogpostService } from '../../BlogPost/Services/blogpost.service';
import { BlogPost } from '../../BlogPost/Models/blogpost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  blogposts: BlogPost[] = [];
  isLoading = true;
  errorMessage = '';

  private destroy$ = new Subject<void>();

  constructor(private blogpostService: BlogpostService) { }

  ngOnInit(): void {
    this.blogpostService.getPublishedBlogposts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (posts) => {
          this.blogposts = posts;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Could not load blog posts. Please try again later.';
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}