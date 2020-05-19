import { Injectable } from '@angular/core';
import { PessoaService } from '../service/pessoa.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PessoaCadastroResolveService implements Resolve<any> {

  constructor(
    private servcie: PessoaService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    return this.servcie.buscarPorId(parseInt(id, 0)).pipe(map(resp => {
      return {
        pessoa: resp
      };
    }));
  }


}
