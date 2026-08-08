
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from '../features/Category/Services/category-service.service';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {
 editCategoryForm!: FormGroup;

  categoryId!: string;

  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Get GUID from URL
    this.categoryId = this.route.snapshot.paramMap.get('id')!;

    // Create form
    this.editCategoryForm = this.fb.group({
      name: ['', Validators.required],
      urlHandle: ['', Validators.required]
    });

    // Get category details
    this.getCategoryById();
  }


  getCategoryById(): void {

    this.isLoading = true;

    this.categoryService.getCategoryById(this.categoryId)
      .subscribe({

        next: (category) => {

          // Put API data into form
          this.editCategoryForm.patchValue({
            name: category.name,
            urlHandle: category.urlHandle
          });

          this.isLoading = false;
        },

        error: (error) => {

          console.error(error);

          this.errorMessage = 'Unable to load category.';
          this.isLoading = false;
        }

      });
  }


  updateCategory(): void {

    if (this.editCategoryForm.invalid) {
      this.editCategoryForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const category = this.editCategoryForm.value;

    this.categoryService
      .updateCategory(this.categoryId, category)
      .subscribe({

        next: () => {

          this.isLoading = false;

          // Go back to category list
          this.router.navigate(['/admin/categories']);
        },

        error: (error) => {

          console.error(error);

          this.errorMessage = 'Unable to update category.';
          this.isLoading = false;
        }

      });
  }
}
