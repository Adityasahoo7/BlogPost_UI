import { TestBed } from '@angular/core/testing';

import { ImageSelecterServiceService } from './image-selecter-service.service';

describe('ImageSelecterServiceService', () => {
  let service: ImageSelecterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSelecterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
