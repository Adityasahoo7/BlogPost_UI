import { Component, OnDestroy, Signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ImageSelecterServiceService } from '../../Services/image-selecter-service.service';
import { BlogImage } from '../../Models/blog-image.model';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnDestroy {

  readonly showimageselector: Signal<boolean>;

  uploadForm: FormGroup;

  // Deliberately NOT form controls
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  images: BlogImage[] = [];
  isUploading = false;
  errorMessage: string | null = null;

  private readonly allowedExtensions = ['.jpg', '.jpeg', '.png'];
  private readonly maxFileSizeBytes = 10 * 1024 * 1024; // 10 MB
  private uploadSubscription?: Subscription;

  constructor(
    private imageselectorservice: ImageSelecterServiceService,
    private fb: FormBuilder
  ) {
    this.showimageselector = this.imageselectorservice.showimageselector.asReadonly();

    this.uploadForm = this.fb.group({
      fileName: ['', [Validators.required, Validators.maxLength(100)]],
      title: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  get fileName() {
    return this.uploadForm.get('fileName');
  }

  get title() {
    return this.uploadForm.get('title');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.errorMessage = null;
    this.clearFile();

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const validationError = this.validateFile(file);

    if (validationError) {
      this.errorMessage = validationError;
      input.value = '';
      return;
    }

    this.selectedFile = file;
    this.previewUrl = URL.createObjectURL(file);
  }

  onFormSubmit(): void {
    this.errorMessage = null;

    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return;
    }

    if (!this.selectedFile) {
      this.errorMessage = 'Please choose an image file.';
      return;
    }

    this.isUploading = true;

    this.uploadSubscription = this.imageselectorservice
      .uploadImage(
        this.selectedFile,
        this.uploadForm.value.fileName,
        this.uploadForm.value.title
      )
      .subscribe({
        next: (image) => {
          this.isUploading = false;
          this.images = [image, ...this.images];
          this.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          this.isUploading = false;
          this.errorMessage = this.extractErrorMessage(error);
        }
      });
  }

  selectImage(image: BlogImage): void {
    this.imageselectorservice.selectImage(image);
  }

  hideimageselector(): void {
    this.imageselectorservice.hideimageselector();
  }

  ngOnDestroy(): void {
    this.uploadSubscription?.unsubscribe();
    this.clearFile();
  }

  private validateFile(file: File): string | null {
    const dotIndex = file.name.lastIndexOf('.');
    const extension = dotIndex >= 0
      ? file.name.substring(dotIndex).toLowerCase()
      : '';

    if (!this.allowedExtensions.includes(extension)) {
      return 'Unsupported file format. Allowed: .jpg, .jpeg, .png';
    }

    if (file.size > this.maxFileSizeBytes) {
      return "File size can't be more than 10 MB.";
    }

    return null;
  }

  private resetForm(): void {
    this.uploadForm.reset();
    this.clearFile();
  }

  private clearFile(): void {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.previewUrl = null;
    this.selectedFile = null;
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Could not reach the server. Is the API running?';
    }

    if (error.status === 413) {
      return 'File is too large. Maximum size is 10 MB.';
    }

    if (error.error?.errors) {
      const messages = Object.values(error.error.errors).flat() as string[];
      if (messages.length > 0) {
        return messages.join(' ');
      }
    }

    return 'Upload failed. Please try again.';
  }
}