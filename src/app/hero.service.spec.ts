import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should create HeroService', () => {
    expect(service).toBeTruthy();
  });
});
