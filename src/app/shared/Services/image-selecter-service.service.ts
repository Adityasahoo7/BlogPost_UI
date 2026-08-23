import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BlogImage } from '../Models/blog-image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageSelecterServiceService {

  private readonly apiBaseUrl = 'http://localhost:5086';

  showimageselector = signal<boolean>(false);

  private selectedImageSubject = new Subject<BlogImage>();
  selectedImage$: Observable<BlogImage> = this.selectedImageSubject.asObservable();

  constructor(private http: HttpClient) { }

  displayimageselector(): void {
    this.showimageselector.set(true);
  }

  hideimageselector(): void {
    this.showimageselector.set(false);
  }

  selectImage(image: BlogImage): void {
    this.selectedImageSubject.next(image);
    this.hideimageselector();
  }

  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('FileName', fileName);
    formData.append('Title', title);

    return this.http.post<BlogImage>(
      `${this.apiBaseUrl}/api/Images/UploadImage`,
      formData
    );
  }
}