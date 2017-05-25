import { TestBed, inject } from '@angular/core/testing';

import { GetweatherService } from './getweather.service';

describe('GetweatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetweatherService]
    });
  });

  it('should be created', inject([GetweatherService], (service: GetweatherService) => {
    expect(service).toBeTruthy();
  }));
});
