import { TestBed } from '@angular/core/testing';

import { PessoaResolveService } from './pessoa-resolve.service';

describe('PessoaResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PessoaResolveService = TestBed.get(PessoaResolveService);
    expect(service).toBeTruthy();
  });
});
