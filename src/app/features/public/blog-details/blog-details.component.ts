import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { BlogPost } from '../../BlogPost/Models/blogpost.model';
import { BlogpostService } from '../../BlogPost/Services/blogpost.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit, OnDestroy {

  blogpost?: BlogPost;
  isLoading = true;
  errorMessage = '';

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private blogpostService: BlogpostService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.isLoading = true;
          return this.blogpostService.getbyidblog(params.get('id')!);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (post) => {
          this.blogpost = post;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'This post could not be found.';
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}