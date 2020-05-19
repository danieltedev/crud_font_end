import { TestBed } from '@angular/core/testing';

import { PessoaCadastroResolveService } from './pessoa-cadastro-resolve.service';

describe('PessoaCadastroResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PessoaCadastroResolveService = TestBed.get(PessoaCadastroResolveService);
    expect(service).toBeTruthy();
  });
});
